/*
  Avatar Component — Production Build
  - Loads real Avaturn GLB model with Mixamo typing animation
  - Retargets bone names and filters position tracks to prevent mesh distortion
  - Adds real-time cursor-tracking head tilt for interactivity
*/

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Avatar(props) {
  const group = useRef();
  const headBoneRef = useRef(null);

  // 1. Load the base Avaturn avatar model
  const { nodes, materials } = useGLTF('/models/avatar.glb');

  // 2. Load the external typing animation file
  const { animations: typingAnim } = useGLTF('/animations/typing.glb');

  // 3. Retarget: strip mixamorig prefix + filter position tracks
  const retargetedAnimations = useMemo(() => {
    if (!typingAnim || typingAnim.length === 0) return [];

    const clonedAnim = typingAnim.map(clip => clip.clone());

    clonedAnim.forEach(clip => {
      clip.tracks = clip.tracks.filter(track => {
        let trackName = track.name.replace(/mixamorig:?/i, '');
        const parts = trackName.split('.');
        if (parts[0]) {
          parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          trackName = parts.join('.');
        }
        track.name = trackName;

        // CRITICAL: Delete position data for all bones except Hips
        if (track.name.includes('.position') && !track.name.includes('Hips')) {
          return false;
        }
        return true;
      });
    });

    return clonedAnim;
  }, [typingAnim]);

  // 4. Bind retargeted animations to the group ref
  const { actions } = useAnimations(retargetedAnimations, group);

  // 5. Automatically play the typing animation on mount
  useEffect(() => {
    if (retargetedAnimations && retargetedAnimations.length > 0) {
      const clipName = retargetedAnimations[0].name;
      const action = actions[clipName];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, retargetedAnimations]);

  // 6. Find the Head bone in the skeleton for cursor tracking
  useEffect(() => {
    if (nodes.Hips) {
      nodes.Hips.traverse((child) => {
        if (child.isBone && child.name === 'Head') {
          headBoneRef.current = child;
        }
      });
    }
  }, [nodes]);

  // 7. Cursor-tracking head tilt — the avatar follows your mouse
  useFrame((state) => {
    if (headBoneRef.current) {
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        mouseX * 0.5,
        0.08
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        -mouseY * 0.3,
        0.08
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.avaturn_body.geometry}
        material={materials.avaturn_body_material}
        skeleton={nodes.avaturn_body.skeleton}
        castShadow
        receiveShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_glasses_0.geometry}
        material={materials.avaturn_glasses_0_material}
        skeleton={nodes.avaturn_glasses_0.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_glasses_1.geometry}
        material={materials.avaturn_glasses_1_material}
        skeleton={nodes.avaturn_glasses_1.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_hair_0.geometry}
        material={materials.avaturn_hair_0_material}
        skeleton={nodes.avaturn_hair_0.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_hair_1.geometry}
        material={materials.avaturn_hair_1_material}
        skeleton={nodes.avaturn_hair_1.skeleton}
        castShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_shoes_0.geometry}
        material={materials.avaturn_shoes_0_material}
        skeleton={nodes.avaturn_shoes_0.skeleton}
        castShadow
        receiveShadow
      />
      <skinnedMesh
        geometry={nodes.avaturn_look_0.geometry}
        material={materials.avaturn_look_0_material}
        skeleton={nodes.avaturn_look_0.skeleton}
        castShadow
      />
    </group>
  );
}

export default Avatar;

useGLTF.preload('/models/avatar.glb');
useGLTF.preload('/animations/typing.glb');