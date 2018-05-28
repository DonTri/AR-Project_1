function load(args) {

    /*      // OBJ 
          var objLoader = new THREE.OBJMTLLoader();
          var mesh = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshBasicMaterial());

          objLoader.addEventListener('load', function(event) {

              var obj = event.content;

              obj.traverse(function(child) {
                  if (child.geometry !== undefined) {
                      var mesh = new THREE.Mesh(child.geometry, child.material);
                      mesh.add(mesh_);
                  }
              });


              scene.add(mesh);


          });

          objLoader.load(args.url + '.obj', args.url + '.mtl');*/

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(args.url + '.mtl', function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(args.url + ".obj", function (object) {
            object.scale.set(10, 10, 10);
            scene.add(object);
        });
    });

    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    var light2 = new THREE.PointLight(0xff0000, 1, 10000);
    light2.position.set(50, 50, 50);
    // scene.add(light2);

    var sphereSize = 1000;
    var pointLightHelper = new THREE.PointLightHelper(light2, sphereSize);
    // scene.add(pointLightHelper);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, -1, -1);
    scene.add(directionalLight);

}


/*  var mesh = null;

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl("http://threejs.org/examples/obj/walt/");
  mtlLoader.setPath("http://threejs.org/examples/obj/walt/");
  mtlLoader.load('WaltHead.mtl', function(materials) {

      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("http://threejs.org/examples/obj/walt/");
      objLoader.load('WaltHead.obj', function(object) {

          mesh = object;
          mesh.position.y = -50;
          scene.add(mesh);

      });

  });*/