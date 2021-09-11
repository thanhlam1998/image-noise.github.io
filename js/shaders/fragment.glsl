varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;
uniform float hoverState;
uniform sampler2D texture1;
uniform sampler2D texture2;

void main() {
	vec2 newUV = vUv;

	vec2 p = newUV;
	float x = hoverState;
	x = smoothstep(.0, 1.0, (x * 2.0 + p.y - 1.0));
	vec4 f = mix(texture2D(texture1, (p - .5) * (1. - x) + .5), texture2D(texture2, (p - .5) * x + .5), x);

	vec4 oceanView = texture2D(uImage, newUV);

	// gl_FragColor = vec4(finalColor, 1.);
	// gl_FragColor = vec4(vUv, 0., 1.);
	// gl_FragColor = oceanView;
	// gl_FragColor = vec4(vNoise, 0., 0., 1.);

	gl_FragColor = f;
	gl_FragColor.rgb += 0.1 * vec3(vNoise);
}