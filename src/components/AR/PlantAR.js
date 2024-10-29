import React from 'react';
import 'aframe';
import 'ar.js';

const PlantAR = ({ plantData }) => {
    return (
        <div className="ar-view">
            <a-scene embedded arjs="trackingMethod: best;">
                <a-marker preset="hiro">
                    <a-entity
                        position="0 0 0"
                        scale="0.05 0.05 0.05"
                        gltf-model={plantData.model3D}
                    ></a-entity>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </div>
    );
};