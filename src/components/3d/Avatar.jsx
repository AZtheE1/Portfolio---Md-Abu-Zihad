/*
Enhanced Avaturn Model Component with Mixamo Animations & Detailed Debugging
Properly combines multiple animation channels and targets them to the Avaturn skeleton.
*/

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations, useFrame } from '@react-three/drei';
import * as THREE from 'three';

export function Avatar({ animation = 'typing', ...props }) {
  const group = useRef();

  // 1. Load the base Avaturn avatar mesh & skeleton
  const { nodes, materials } = useGLTF('/models/avatar.glb');

  // 2. Load the external Mixamo animation files
  const { animations: typingAnimations } = useGLTF('/animations/Typing.glb');
  const { animations: wavingAnimations } = useGLTF('/animations/Waving.glb');

  // Build unified AnimationClips from the separate channels
  const clips = useMemo(() => {
    const buildClip = (rawAnimations, clipName) => {
      if (!rawAnimations || rawAnimations.length === 0) return null;
      
      const tracks = [];
      let maxDuration = 0;

      rawAnimations.forEach((anim) => {
        if (!anim.tracks) return;
        anim.tracks.forEach((track) => {
          // Clone track and clean target node name
          // Avaturn bones: 'Hips', 'Spine', 'LeftForeArm', etc.
          let cleanedName = track.name;

          // Strip typical Mixamo/Assimp prefixes
          cleanedName = cleanedName
            .replace(/^.*mixamorig:?/i, '')
            .replace(/^.*Armature\|?/i, '')
            .replace(/_\$AssimpFbx\$_Rotation/i, '')
            .replace(/_\$AssimpFbx\$_Translation/i, '')
            .replace(/_\$AssimpFbx\$_PreRotation/i, '');

          // Check if this bone actually exists on the avatar
          const boneName = cleanedName.split('.')[0];
          const property = cleanedName.split('.')[1] || 'quaternion';

          if (nodes[boneName]) {
            const newTrack = track.clone();
            newTrack.name = `${boneName}.${property}`;
            tracks.push(newTrack);
            if (newTrack.times && newTrack.times.length > 0) {
              const lastTime = newTrack.times[newTrack.times.length - 1];
              if (lastTime > maxDuration) maxDuration = lastTime;
            }
          }
        });
      });

      if (tracks.length === 0) {
        // Fallback: if names already match directly
        rawAnimations.forEach(a => a.tracks && a.tracks.forEach(t => tracks.push(t.clone())));
      }

      return new THREE.AnimationClip(clipName, maxDuration || -1, tracks);
    };

    const list = [];
    const typingClip = buildClip(typingAnimations, 'typing');
    if (typingClip) list.push(typingClip);

    const wavingClip = buildClip(wavingAnimations, 'waving');
    if (wavingClip) list.push(wavingClip);

    return list;
  }, [typingAnimations, wavingAnimations, nodes]);

  // Bind animations to group
  const { actions, mixer } = useAnimations(clips, group);

  // Play animation on mount and cross-fade smoothly
  useEffect(() => {
    const action = actions[animation] || actions['typing'] || actions[Object.keys(actions)[0]];

    if (action) {
      console.log(`▶️ Avatar playing: "${animation}" (${action.getClip().tracks.length} active bone tracks)`);
      action.reset().fadeIn(0.4).play();
    } else {
      console.warn(`Action "${animation}" not found in actions:`, Object.keys(actions));
    }

    return () => {
      if (action) {
        action.fadeOut(0.4);
      }
    };
  }, [actions, animation]);

  // Cursor tracking for head
  useFrame((state) => {
    if (nodes.Head) {
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;
      nodes.Head.rotation.y = THREE.MathUtils.lerp(nodes.Head.rotation.y, mouseX * 0.4, 0.1);
      nodes.Head.rotation.x = THREE.MathUtils.lerp(nodes.Head.rotation.x, -mouseY * 0.3, 0.1);
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
useGLTF.preload('/animations/Typing.glb');
useGLTF.preload('/animations/Waving.glb');