import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "@/assets/earth-texture.jpg";

interface CityPin {
  city: string;
  lat: number;
  lng: number;
  flag: string;
  isActive: boolean;
  onClick: () => void;
}

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeMesh({ cities, targetCity }: { cities: CityPin[]; targetCity: string | null }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef<{ x: number; y: number } | null>(null);
  const hasInitialized = useRef(false);

  const texture = useLoader(THREE.TextureLoader, earthTexture);

  // Initial rotation: centered on Middle East/Europe region (lat ~30, lng ~30)
  const initialRotation = useMemo(() => {
    const lat = 30;
    const lng = 30;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return { x: -(phi - Math.PI / 2), y: -(theta - Math.PI) };
  }, []);

  // Set initial rotation on mount
  useEffect(() => {
    if (groupRef.current && !hasInitialized.current) {
      groupRef.current.rotation.x = initialRotation.x;
      groupRef.current.rotation.y = initialRotation.y;
      hasInitialized.current = true;
    }
  }, [initialRotation]);

  // Rotate globe to target city
  useEffect(() => {
    if (targetCity) {
      const city = cities.find((c) => c.city === targetCity);
      if (city) {
        const phi = (90 - city.lat) * (Math.PI / 180);
        const theta = (city.lng + 180) * (Math.PI / 180);
        targetRotation.current = { x: -(phi - Math.PI / 2), y: -(theta - Math.PI) };
      }
    } else {
      targetRotation.current = null;
    }
  }, [targetCity, cities]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (targetRotation.current) {
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.04;
    }
    // No auto-rotation — globe stays on the initial view
  });

  return (
    <group ref={groupRef}>
      {/* Earth globe with texture */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>

      {/* Subtle atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.06, 48, 48]} />
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* City pins */}
      {cities.map((city) => {
        const pos = latLngToVector3(city.lat, city.lng, 2.05);
        return (
          <group key={city.city} position={pos}>
            {/* Pin dot */}
            <mesh onClick={city.onClick}>
              <sphereGeometry args={[city.isActive ? 0.07 : 0.045, 16, 16]} />
              <meshBasicMaterial color={city.isActive ? "#c9a96e" : "#ffffff"} />
            </mesh>
            {/* Pulse ring for active */}
            {city.isActive && (
              <mesh>
                <ringGeometry args={[0.09, 0.13, 32]} />
                <meshBasicMaterial color="#c9a96e" transparent opacity={0.5} side={THREE.DoubleSide} />
              </mesh>
            )}
            {/* Label */}
            <Html
              position={[0, 0.18, 0]}
              center
              style={{ pointerEvents: "none", userSelect: "none" }}
              occlude={false}
              zIndexRange={[10, 0]}
            >
              <div
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-body font-semibold transition-all duration-300 shadow-lg ${
                  city.isActive
                    ? "bg-kingdom-gold text-background scale-110"
                    : "bg-primary/90 text-primary-foreground/90 scale-95"
                }`}
              >
                <span className="mr-1">{city.flag}</span>
                {city.city}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Connection arcs between cities */}
      {cities.length > 1 &&
        cities.slice(0, -1).map((c, i) => {
          const next = cities[i + 1];
          const start = latLngToVector3(c.lat, c.lng, 2.05);
          const end = latLngToVector3(next.lat, next.lng, 2.05);
          const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.6);
          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const points = curve.getPoints(32);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <primitive
              key={`arc-${i}`}
              object={new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({ color: "#c9a96e", transparent: true, opacity: 0.3 })
              )}
            />
          );
        })}
    </group>
  );
}

interface GlobeProps {
  selectedCountry: string | null;
  onSelectCountry: (city: string) => void;
  selectedCity?: string | null;
}

export default function Globe({ selectedCountry, onSelectCountry, selectedCity }: GlobeProps) {
  const cityData: Omit<CityPin, "isActive" | "onClick">[] = [
    { city: "London", lat: 51.5, lng: -0.12, flag: "🇬🇧" },
    { city: "Dubai", lat: 25.2, lng: 55.27, flag: "🇦🇪" },
    { city: "Riyadh", lat: 24.7, lng: 46.7, flag: "🇸🇦" },
    { city: "Turkey", lat: 41.0, lng: 28.98, flag: "🇹🇷" },
  ];

  const target = selectedCountry || selectedCity || null;

  const cities: CityPin[] = cityData.map((c) => ({
    ...c,
    isActive: target === c.city,
    onClick: () => onSelectCountry(c.city),
  }));

  return (
    <div className="w-full h-full" style={{ minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#b0c4de" />
        <GlobeMesh cities={cities} targetCity={target} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  );
}
