  Charge.clickStart("charge7")

  function charges7(el) {
    const q = []; //holds the charges
    Charge.setup(el, q);

    let pause = false;
    el.addEventListener("mouseleave", function () {
      pause = true;
    });
    el.addEventListener("mouseenter", function () {
      Charge.setCanvas(el);
      if (pause) requestAnimationFrame(cycle);
      pause = false;
    });


    //spawn p before e to avoid a bug in the class method allPhysics
    const side = 30;
    const apothem = side * 0.866; //vertical distance between rows
    const rows = 6; // y
    const columns = 4; // x

    const hexLeft = canvas.width / 2 - side * ((columns * 3) / 4);
    const hexTop = canvas.height / 2 - apothem * (rows / 2);

    for (let y = 1; y < rows; ++y) {
      let xOff = 0;
      if (y % 2) {} else {
        xOff = 0.5; //odd
      }
      for (let x = -1, i = 0; i < columns; ++i) {
        if (i % 2) {
          //even
          x++;
          xOff = Math.abs(xOff);
        } else {
          //odd
          x += 2;
          xOff = -Math.abs(xOff);
        }

        q[q.length] = new Charge("p", {
          x: hexLeft + (x + xOff) * side,
          y: hexTop + y * apothem
        });
        q[q.length] = new Charge("e", {
          x: hexLeft + (x + xOff) * side + 10 * (Math.random() - 0.5),
          y: hexTop + y * apothem
        });
      }
    }

    function cycle() {
      Charge.physicsAll(q);
      Charge.bounds(q);
      Charge.scalarField(q, true);
      if (!pause) requestAnimationFrame(cycle);
    }
    requestAnimationFrame(cycle);
  }