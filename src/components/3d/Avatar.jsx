/*
Enhanced Avaturn Model Component with Mixamo Animations & Detailed Debugging
*/

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function Avatar({ animation = 'typing', ...props }) {
  const group = useRef();

  // 1. Load the base Avaturn avatar mesh & skeleton
  const { nodes, materials } = useGLTF('/models/avatar.glb');

  // 2. Load the external Mixamo animation files from public/animations
  const { animations: typingAnimations } = useGLTF('/animations/Typing.glb');
  const { animations: wavingAnimations } = useGLTF('/animations/Waving.glb');

  // Strip bone prefixes (like 'mixamorig:') so Mixamo animation tracks map 1:1 to avatar bone hierarchy
  const clips = useMemo(() => {
    const list = [];
    const sanitizeClip = (sourceClip, newName) => {
      if (!sourceClip) return null;
      const clip = sourceClip.clone();
      clip.name = newName;
      clip.tracks.forEach((track) => {
        // Avaturn bones: 'Hips.position', 'Spine.quaternion', etc.
        // If Mixamo exported with 'mixamorigHips.position' or 'Armature/mixamorig:Hips.position', clean it:
        track.name = track.name
          .replace(/^.*mixamorig:?/i, '')
          .replace(/^.*Armature\|?/i, '');
      });
      return clip;
    };

    if (typingAnimations && typingAnimations[0]) {
      list.push(sanitizeClip(typingAnimations[0], 'typing'));
    }
    if (wavingAnimations && wavingAnimations[0]) {
      list.push(sanitizeClip(wavingAnimations[0], 'waving'));
    }
    return list.filter(Boolean);
  }, [typingAnimations, wavingAnimations]);

  // Bind sanitized animations to the group ref
  const { actions, names } = useAnimations(clips, group);

  // Play execution with cross-fade
  useEffect(() => {
    const actionToPlay = actions[animation] || actions[Object.keys(actions)[0]];

    if (actionToPlay) {
      console.log(`▶️ Successfully playing clip: "${actionToPlay.getClip().name}" with ${actionToPlay.getClip().tracks.length} tracks`);
      actionToPlay.reset().fadeIn(0.3).play();
    } else {
      console.warn(`Animation "${animation}" not found in`, Object.keys(actions));
    }

    return () => {
      if (actionToPlay) {
        actionToPlay.fadeOut(0.3);
      }
    };
  }, [actions, animation]);

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