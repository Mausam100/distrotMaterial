import React, { useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { MeshDistortMaterial, useCursor } from '@react-three/drei'
import * as THREE from 'three' 
import { TextureLoader } from 'three'

function Flag() {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  const texture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1731607352247-663df98aa547?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') 
  useFrame(() => {
    if (ref.current) {
      ref.current.distort = THREE.MathUtils.lerp(ref.current.distort, hovered ? 0.3 : 0, hovered ? 0.05 : 0.01)
    }
  })
  return (
    <mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}> 
      <planeGeometry args={[1, 1.5, 32, 32]} />
      <MeshDistortMaterial ref={ref} map={texture} distort={0} speed={4} /> 
    </mesh>
  )
}

function App() {
  return (
    <div className='w-screen h-screen'>
      <Canvas camera={{position:[0,0,1.5]}}>
        <ambientLight intensity={1} />
        <Flag />
      </Canvas>
    </div>
  )
}

export default App
