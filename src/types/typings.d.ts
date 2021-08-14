/* eslint-disable @typescript-eslint/explicit-member-accessibility */
declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
  }
  declare module 'worker-loader!*' {
    class WebpackWorker extends Worker {
      constructor();
    }
  
    export default WebpackWorker;
  }
  