
var ww = window.innerWidth,
    wh = window.innerHeight;

function init(){

  /* WEBGL RENDERER */
  renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
  renderer.setClearColor(0x0a0a0a);
  renderer.setSize(ww,wh);

  /* SCENE */
  scene = new THREE.Scene();
  //Add fog in my scene
  scene.fog = new THREE.Fog(0x0a0a0a, 500, 1000);

  /* CAMERA */
  camera = new THREE.PerspectiveCamera(50, ww/wh, 1, 10000 );
  camera.position.set(0, 250, 700);
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add(camera);

  /* LIGHT */
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set( 0, 500, 100 );
  scene.add(light);

  createBox();

  renderer.render(scene,camera);

  animate();
}

function createBox(){

  cubes = new THREE.Object3D();

  geometry = new THREE.BoxGeometry(50,50,50);
  texture = new THREE.MeshLambertMaterial({color:0x00ff00 });

  for(var i=0;i<70;i++){
    cube = new THREE.Mesh(geometry, texture);

    cube.position.x = (Math.random()-.5)*ww;
    cube.position.y = (Math.random()-.5)*wh;

    //Create a random variable for each cube so they will move "randomly"
    //Create a random speed for my cube (just for fun)
    cube.random = parseInt((Math.random()-.5)*500);
    cube.speed = Math.random()+.1;

    cubes.add(cube);
  }
  scene.add(cubes);
}

var animate = function () {

  requestAnimationFrame(animate);

  for(var i=0;i<70;i++){

    var cube = cubes.children[i];

    //Move my cube
    cube.position.z = Math.sin(cube.random/70)*500;

    //Increase the start position of the cube
    cube.random += cube.speed;

    //Move our cube
    cube.rotation.x += .02;
    cube.rotation.y += .02;
  }
  renderer.render(scene, camera);
};

init();

