var $2nkYD$three = require("three");
var $2nkYD$threeexamplesjsmpostprocessingEffectComposerjs = require("three/examples/jsm/postprocessing/EffectComposer.js");
var $2nkYD$fontfaceobserver = require("fontfaceobserver");
var $2nkYD$threeexamplesjsmcontrolsOrbitControlsjs = require("three/examples/jsm/controls/OrbitControls.js");
var $2nkYD$threeexamplesjsmpostprocessingRenderPassjs = require("three/examples/jsm/postprocessing/RenderPass.js");
var $2nkYD$threeexamplesjsmpostprocessingShaderPassjs = require("three/examples/jsm/postprocessing/ShaderPass.js");
var $2nkYD$gsap = require("gsap");
var $2nkYD$imagesloaded = require("imagesloaded");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $166d288883dd73be$export$9099ad97b570f7c);





const $b17df2d445802723$var$lerp = (a, b, n)=>(1 - n) * a + n * b
;
class $b17df2d445802723$export$9099ad97b570f7c {
    constructor(){
        this.DOM = {
            main: document.querySelector("main")
        };
        this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll");
        this.docScroll = 0;
        this.scrollToRender = 0;
        this.current = 0;
        this.ease = 0.1;
        this.speed = 0;
        this.speedTarget = 0;
        // set the body's height
        this.setSize();
        // set the initial values
        this.getScroll();
        this.init();
        // the <main> element's style needs to be modified
        this.style();
        // init/bind events
        this.initEvents();
        requestAnimationFrame(()=>this.render()
        );
    }
    init() {
        for(const key in this.renderedStyles)this.current = this.scrollToRender = this.getScroll();
        // translate the scrollable element
        this.setPosition();
        this.shouldRender = true;
    }
    style() {
        this.DOM.main.style.position = "fixed";
        this.DOM.main.style.width = this.DOM.main.style.height = "100%";
        this.DOM.main.style.top = this.DOM.main.style.left = 0;
        this.DOM.main.style.overflow = "hidden";
    }
    setSize() {
        // set the height of the body in order to keep the scrollbar on the page
        document.body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }
    getScroll() {
        this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
        return this.docScroll;
    }
    initEvents() {
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        };
        // on resize reset the body's height
        window.addEventListener("resize", ()=>this.setSize()
        );
        window.addEventListener("scroll", this.getScroll.bind(this));
    }
    setPosition() {
        // translates the scrollable element
        if (Math.round(this.scrollToRender) !== Math.round(this.current) || this.scrollToRender < 10) this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.scrollToRender}px,0)`;
    }
    render() {
        this.speed = Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
        this.speedTarget += (this.speed - this.speedTarget) * 0.2;
        this.current = this.getScroll();
        this.scrollToRender = $b17df2d445802723$var$lerp(this.scrollToRender, this.current, this.ease);
        // and translate the scrollable element
        this.setPosition();
    }
}



var $c77c961576f9bce5$exports = {};
$c77c961576f9bce5$exports = "#define GLSLIFY 1\nvarying float vNoise;\nvarying vec2 vUv;\nuniform sampler2D uImage;\nuniform float time;\nuniform float hoverState;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\n\nvoid main() {\n\tvec2 newUV = vUv;\n\n\tvec2 p = newUV;\n\tfloat x = hoverState;\n\tx = smoothstep(.0, 1.0, (x * 2.0 + p.y - 1.0));\n\tvec4 f = mix(texture2D(texture1, (p - .5) * (1. - x) + .5), texture2D(texture2, (p - .5) * x + .5), x);\n\n\tvec4 oceanView = texture2D(uImage, newUV);\n\n\t// gl_FragColor = vec4(finalColor, 1.);\n\t// gl_FragColor = vec4(vUv, 0., 1.);\n\t// gl_FragColor = oceanView;\n\t// gl_FragColor = vec4(vNoise, 0., 0., 1.);\n\n\tgl_FragColor = f;\n\tgl_FragColor.rgb += 0.1 * vec3(vNoise);\n}";




var $3045afab8befd6b4$exports = {};
$3045afab8befd6b4$exports = "#define GLSLIFY 1\n//\tClassic Perlin 3D Noise \n//\tby Stefan Gustavson\n//\nvec4 permute(vec4 x) {\n\treturn mod(((x * 34.0) + 1.0) * x, 289.0);\n}\nvec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t) {\n\treturn t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nfloat cnoise(vec3 P) {\n\tvec3 Pi0 = floor(P); // Integer part for indexing\n\tvec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n\tPi0 = mod(Pi0, 289.0);\n\tPi1 = mod(Pi1, 289.0);\n\tvec3 Pf0 = fract(P); // Fractional part for interpolation\n\tvec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n\tvec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n\tvec4 iy = vec4(Pi0.yy, Pi1.yy);\n\tvec4 iz0 = Pi0.zzzz;\n\tvec4 iz1 = Pi1.zzzz;\n\n\tvec4 ixy = permute(permute(ix) + iy);\n\tvec4 ixy0 = permute(ixy + iz0);\n\tvec4 ixy1 = permute(ixy + iz1);\n\n\tvec4 gx0 = ixy0 / 7.0;\n\tvec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n\tgx0 = fract(gx0);\n\tvec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n\tvec4 sz0 = step(gz0, vec4(0.0));\n\tgx0 -= sz0 * (step(0.0, gx0) - 0.5);\n\tgy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n\tvec4 gx1 = ixy1 / 7.0;\n\tvec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n\tgx1 = fract(gx1);\n\tvec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n\tvec4 sz1 = step(gz1, vec4(0.0));\n\tgx1 -= sz1 * (step(0.0, gx1) - 0.5);\n\tgy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n\tvec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n\tvec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n\tvec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n\tvec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n\tvec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n\tvec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n\tvec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n\tvec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n\n\tvec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n\tg000 *= norm0.x;\n\tg010 *= norm0.y;\n\tg100 *= norm0.z;\n\tg110 *= norm0.w;\n\tvec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n\tg001 *= norm1.x;\n\tg011 *= norm1.y;\n\tg101 *= norm1.z;\n\tg111 *= norm1.w;\n\n\tfloat n000 = dot(g000, Pf0);\n\tfloat n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n\tfloat n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n\tfloat n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n\tfloat n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n\tfloat n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n\tfloat n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n\tfloat n111 = dot(g111, Pf1);\n\n\tvec3 fade_xyz = fade(Pf0);\n\tvec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n\tvec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n\tfloat n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n\treturn 2.2 * n_xyz;\n}";


var $347b7b525bafc9a3$exports = {};
$347b7b525bafc9a3$exports = new URL("ocean.3c24560f.jpg", "file:" + __filename).toString();


var $252b9828b0961875$exports = {};
$252b9828b0961875$exports = "#define GLSLIFY 1\n//\tClassic Perlin 3D Noise \n//\tby Stefan Gustavson\n//\nvec4 permute(vec4 x) {\n\treturn mod(((x * 34.0) + 1.0) * x, 289.0);\n}\nvec4 taylorInvSqrt(vec4 r) {\n\treturn 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t) {\n\treturn t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nfloat cnoise(vec3 P) {\n\tvec3 Pi0 = floor(P); // Integer part for indexing\n\tvec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n\tPi0 = mod(Pi0, 289.0);\n\tPi1 = mod(Pi1, 289.0);\n\tvec3 Pf0 = fract(P); // Fractional part for interpolation\n\tvec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n\tvec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n\tvec4 iy = vec4(Pi0.yy, Pi1.yy);\n\tvec4 iz0 = Pi0.zzzz;\n\tvec4 iz1 = Pi1.zzzz;\n\n\tvec4 ixy = permute(permute(ix) + iy);\n\tvec4 ixy0 = permute(ixy + iz0);\n\tvec4 ixy1 = permute(ixy + iz1);\n\n\tvec4 gx0 = ixy0 / 7.0;\n\tvec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n\tgx0 = fract(gx0);\n\tvec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n\tvec4 sz0 = step(gz0, vec4(0.0));\n\tgx0 -= sz0 * (step(0.0, gx0) - 0.5);\n\tgy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n\tvec4 gx1 = ixy1 / 7.0;\n\tvec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n\tgx1 = fract(gx1);\n\tvec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n\tvec4 sz1 = step(gz1, vec4(0.0));\n\tgx1 -= sz1 * (step(0.0, gx1) - 0.5);\n\tgy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n\tvec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n\tvec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n\tvec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n\tvec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n\tvec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n\tvec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n\tvec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n\tvec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n\n\tvec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n\tg000 *= norm0.x;\n\tg010 *= norm0.y;\n\tg100 *= norm0.z;\n\tg110 *= norm0.w;\n\tvec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n\tg001 *= norm1.x;\n\tg011 *= norm1.y;\n\tg101 *= norm1.z;\n\tg111 *= norm1.w;\n\n\tfloat n000 = dot(g000, Pf0);\n\tfloat n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n\tfloat n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n\tfloat n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n\tfloat n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n\tfloat n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n\tfloat n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n\tfloat n111 = dot(g111, Pf1);\n\n\tvec3 fade_xyz = fade(Pf0);\n\tvec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n\tvec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n\tfloat n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n\treturn 2.2 * n_xyz;\n}\n\nuniform float time;\nuniform vec2 hover;\nuniform float hoverState;\nvarying float vNoise;\nvarying vec2 vUv;\n\nvoid main() {\n\tvec3 newposition = position;\n\tfloat PI = 3.141592654;\n\n\t// newposition.z += 0.1 * sin((newposition.x + 0.25 + time / 10.) * 2. * PI);\n\tfloat noise = cnoise(3. * vec3(position.x, position.y, position.z + time / 30.));\n\n\tfloat dist = distance(uv, hover);\n\n\tnewposition.z += hoverState * 10. * sin(dist * 10. + time);\n\t// newposition.z += 0.05 * sin(noise * 20.);\n\t// newposition += 0.1 * normal * noise;\n\n\tvNoise = sin(dist * 10. + time);\n\tvUv = uv;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);\n}";


class $166d288883dd73be$export$9099ad97b570f7c {
    constructor(options){
        this.time = 0;
        this.container = options.dom;
        this.scene = new $2nkYD$three.Scene();
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.camera = new $2nkYD$three.PerspectiveCamera(70, this.width / this.height, 100, 2000);
        this.camera.position.z = 600;
        this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);
        this.renderer = new $2nkYD$three.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.images = [
            ...document.querySelectorAll("img")
        ];
        const fontOpen = new Promise((resolve)=>{
            new $parcel$interopDefault($2nkYD$fontfaceobserver)("Open Sans").load().then(()=>{
                resolve();
            });
        });
        const fontPlayfair = new Promise((resolve)=>{
            new $parcel$interopDefault($2nkYD$fontfaceobserver)("Playfair Display").load().then(()=>{
                resolve();
            });
        });
        // Preload images
        const preloadImages = new Promise((resolve, reject)=>{
            $parcel$interopDefault($2nkYD$imagesloaded)(document.querySelectorAll("img"), {
                background: true
            }, resolve);
        });
        let allDone = [
            fontOpen,
            fontPlayfair,
            preloadImages
        ];
        this.currentScroll = 0;
        this.previousScroll = 0;
        this.raycaster = new $2nkYD$three.Raycaster();
        this.mouse = new $2nkYD$three.Vector2();
        Promise.all(allDone).then(()=>{
            this.scroll = new $b17df2d445802723$export$9099ad97b570f7c();
            // Store and add image to the right position
            this.addImages();
            this.setPosition();
            this.mouseMovement();
            this.resize();
            this.addControl();
            this.setupResize();
            // this.addObjects();
            this.composerPass();
            this.render();
        // window.addEventListener("scroll", () => {
        //   this.currentScroll = window.scrollY;
        //   this.setPosition();
        // });
        });
    }
    composerPass() {
        this.composer = new $2nkYD$threeexamplesjsmpostprocessingEffectComposerjs.EffectComposer(this.renderer);
        this.renderPass = new $2nkYD$threeexamplesjsmpostprocessingRenderPassjs.RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);
        // custom shader pass
        var counter = 0;
        this.myEffect = {
            uniforms: {
                tDiffuse: {
                    value: null
                },
                scrollSpeed: {
                    value: null
                },
                time: {
                    value: null
                }
            },
            vertexShader: `\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      `,
            fragmentShader: `\n      uniform sampler2D tDiffuse;\n      varying vec2 vUv;\n      uniform float scrollSpeed;\n      uniform float time;\n      ${(/*@__PURE__*/$parcel$interopDefault($3045afab8befd6b4$exports))}\n        void main() {\n          vec2 newUV = vUv;\n          float area = smoothstep(1.,0.7,vUv.y)*2. - 1.;\n          // area = pow(area,4.);\n          float noise = 0.5*(cnoise(vec3(vUv*10., time/2.)) + 1.);\n          float n = smoothstep(0.5,0.51, noise + area);\n          newUV.x -= (vUv.x -0.5) * 0.1 * area * scrollSpeed;\n          gl_FragColor = texture2D(tDiffuse, newUV);\n          // gl_FragColor = vec4(n,0.,0.,1.);\n          gl_FragColor = mix(vec4(1.), texture2D(tDiffuse, newUV), n);\n        }\n      `
        };
        this.customPass = new $2nkYD$threeexamplesjsmpostprocessingShaderPassjs.ShaderPass(this.myEffect);
        this.customPass.renderToScreen = true;
        this.composer.addPass(this.customPass);
    }
    mouseMovement() {
        window.addEventListener("mousemove", (event)=>{
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            this.mouse.x = event.clientX / this.width * 2 - 1;
            this.mouse.y = -(event.clientY / this.height) * 2 + 1;
            // update the picking ray with the camera and mouse position
            this.raycaster.setFromCamera(this.mouse, this.camera);
            // calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                let obj = intersects[0].object;
                obj.material.uniforms.hover.value = intersects[0].uv;
            }
        }, false);
    }
    addControl() {
        this.controls = new $2nkYD$threeexamplesjsmcontrolsOrbitControlsjs.OrbitControls(this.camera, this.renderer.domElement);
    }
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    addImages() {
        this.material = new $2nkYD$three.ShaderMaterial({
            uniforms: {
                time: {
                    value: 0
                },
                uImage: {
                    value: 0
                },
                hover: {
                    value: new $2nkYD$three.Vector2(0.5, 0.5)
                },
                hoverState: {
                    value: 0
                },
                oceanTexture: {
                    value: new $2nkYD$three.TextureLoader().load((/*@__PURE__*/$parcel$interopDefault($347b7b525bafc9a3$exports)))
                }
            },
            side: $2nkYD$three.DoubleSide,
            fragmentShader: (/*@__PURE__*/$parcel$interopDefault($c77c961576f9bce5$exports)),
            vertexShader: (/*@__PURE__*/$parcel$interopDefault($252b9828b0961875$exports))
        });
        this.materials = [];
        this.imageStore = this.images.map((img)=>{
            let bounds = img.getBoundingClientRect();
            let geometry = new $2nkYD$three.PlaneBufferGeometry(bounds.width, bounds.height, 10, 10);
            let texture = new $2nkYD$three.Texture(img);
            texture.needsUpdate = true;
            // let material = new THREE.MeshBasicMaterial({
            //   map: texture,
            // });
            let material = this.material.clone();
            img.addEventListener("mouseenter", ()=>{
                $parcel$interopDefault($2nkYD$gsap).to(material.uniforms.hoverState, {
                    duration: 1,
                    value: 1
                });
            });
            img.addEventListener("mouseout", ()=>{
                $parcel$interopDefault($2nkYD$gsap).to(material.uniforms.hoverState, {
                    duration: 1,
                    value: 0
                });
            });
            this.materials.push(material);
            material.uniforms.uImage.value = texture;
            let mesh = new $2nkYD$three.Mesh(geometry, material);
            this.scene.add(mesh);
            return {
                img: img,
                mesh: mesh,
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height
            };
        });
    }
    setPosition() {
        this.imageStore.forEach((o)=>{
            o.mesh.position.y = this.height / 2 - o.top - o.height / 2 + this.currentScroll;
            o.mesh.position.x = -this.width / 2 + o.left + o.width / 2;
        });
    }
    addObjects() {
        this.geometry = new $2nkYD$three.PlaneBufferGeometry(200, 400, 10, 10);
        // this.geometry = new THREE.SphereBufferGeometry(0.4, 40, 40);
        this.material = new $2nkYD$three.MeshNormalMaterial();
        this.material = new $2nkYD$three.ShaderMaterial({
            uniforms: {
                time: {
                    value: 0
                },
                oceanTexture: {
                    value: new $2nkYD$three.TextureLoader().load((/*@__PURE__*/$parcel$interopDefault($347b7b525bafc9a3$exports)))
                }
            },
            side: $2nkYD$three.DoubleSide,
            fragmentShader: (/*@__PURE__*/$parcel$interopDefault($c77c961576f9bce5$exports)),
            vertexShader: (/*@__PURE__*/$parcel$interopDefault($252b9828b0961875$exports)),
            wireframe: true
        });
        this.mesh = new $2nkYD$three.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }
    render() {
        this.time += 0.05;
        this.scroll.render();
        this.previousScroll = this.currentScroll;
        this.currentScroll = this.scroll.scrollToRender;
        // if (Math.round(this.currentScroll) !== Math.round(this.previousScroll)) {
        this.setPosition();
        this.customPass.uniforms.scrollSpeed.value = this.scroll.speedTarget;
        // this.customPass.uniforms.time.value = this.time;
        this.materials.forEach((m)=>{
            m.uniforms.time.value = this.time;
        });
        this.composer.render();
        // }
        window.requestAnimationFrame(this.render.bind(this));
    }
}
new $166d288883dd73be$export$9099ad97b570f7c({
    dom: document.getElementById("container")
});


//# sourceMappingURL=app.js.map
