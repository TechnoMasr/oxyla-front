import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function FloatingObjects({ count = 25 }) {
  const group = useRef();
  const introProgress = useRef(0); // لتتبع مدى تقدم الأنيميشن

  const objects = useRef(
    Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 3 + Math.random() * 2,
      currentRadius: 15 + Math.random() * 10, // البداية بعيدة جدًا
      ySpeed: 0.0006 + Math.random() * 0.001,
      rotSpeed: 0.1 + Math.random() * 0.25,
      yOffset: Math.random() * 2 - 1,
      color: Math.random() > 0.5 ? "#000" : "#007BFF",
      size: 0.1 + Math.random() * 0.3,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // تقدم الأنيميشن تدريجيًا (من 0 إلى 1)
    if (introProgress.current < 1) {
      introProgress.current += 0.01; // سرعة التقريب (زود أو قلل الرقم ده)
    }

    group.current.children.forEach((mesh, i) => {
      const obj = objects.current[i];
      const angle = t * obj.rotSpeed * obj.dir + obj.angle;

      // انتقال تدريجي من currentRadius إلى radius
      obj.currentRadius = THREE.MathUtils.lerp(
        obj.currentRadius,
        obj.radius,
        introProgress.current * 0.05
      );

      // المسار الدائري
      mesh.position.x = Math.cos(angle) * obj.currentRadius;
      mesh.position.z = Math.sin(angle) * obj.currentRadius;

      // حركة Y بسيطة (طلوع ونزول)
      mesh.position.y = Math.sin(t * obj.ySpeed * 4 + i) * 1.2 + obj.yOffset;

      // دوران خفيف
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.007;
    });
  });

  return (
    <group ref={group}>
      {objects.current.map((obj, i) => (
        <mesh key={i}>
          <sphereGeometry args={[obj.size, 16, 16]} />
          <meshStandardMaterial
            color={obj.color}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function OxylaWord() {
  return (
    <Center>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.5}
        height={0.4}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
      >
        OXYLA
        <meshPhysicalMaterial
          color="#aee7ff"
          roughness={0.1}
          metalness={0.5}
          transmission={0.9} // شفافية
          thickness={1}
        />
      </Text3D>
    </Center>
  );
}

export default function HeroSection() {
  return (
    <div className="h-screen w-full bg-white">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* إضاءة */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1.2} />
        <directionalLight position={[-3, -3, -5]} intensity={0.4} />

        {/* النص */}
        <OxylaWord />

        {/* الأجسام العشوائية */}
        <FloatingObjects />

        {/* تحكم */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
