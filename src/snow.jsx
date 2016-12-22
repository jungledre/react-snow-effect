// @flow
import React, {Component} from 'react';

type Props = {
  height?: number,
  width?: number,
};

type State = {
  intervalTracker: ?Function,
  canvasCtx: ?Function,
  height: number,
  width: number,
};

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 1600;

export default class Snow extends Component {
  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      intervalTracker: null,
      canvasCtx: null,
      height: props.height || window.innerHeight || DEFAULT_HEIGHT,
      width: props.width || window.innerWidth || DEFAULT_WIDTH,
    };
  }

  state: State;

  componentDidMount() {
    //canvas init
    const canvas = document.getElementsByClassName("react-snow-effect-canvas");
    const ctx = canvas[0].getContext("2d");

    this.setState({canvasCtx: ctx});

    //canvas dimensions
    const W = this.state.width;
    const H = this.state.height;

    //snowflake particles
    const mp = 25; //max particles
    const particles = [];
    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp //density
      });
    }

    //Lets draw the flakes
    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0;

    function update() {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        const p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) //66.67% of the flakes
          {
            particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
            } else {
              //Enter from the right
              particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
            }
          }
        }
      }
    }

    this.setState({intervalTracker: setInterval(draw, 33)})

    //animation loop
    this.state.intervalTracker;
  }

  componentWillUnmount() {
    this.state.canvasCtx.clearRect(0, 0, this.state.width, this.state.height);
    clearInterval(this.state.intervalTracker);
  }

  render(): React.Element<*> {
    const snowStyles = {
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      zIndex: 1
    };

    return (
      <canvas
        className="react-snow-effect-canvas"
        style={snowStyles}
        width={this.state.width}
        height={this.state.height}
      >
      </canvas>
    );
  }
};
