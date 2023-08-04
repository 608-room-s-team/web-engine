


class Engine {
    canvas: HTMLCanvasElement
    gl: WebGL2RenderingContext
    perFrameFunctions: { (delta: number): void; }[]
    lastTime: number

	constructor () {
		this.canvas = <HTMLCanvasElement>document.getElementById("screen")
		this.canvas.width = 800;
		this.canvas.height = 600;
        this.perFrameFunctions = []
        this.lastTime = Date.now()
		
		this.gl = <WebGL2RenderingContext>this.canvas.getContext("webgl2");
		this.gl.clearColor(0.4,0.6,1.0,1.0);
        this.gl.viewport(0,0, this.canvas.width, this.canvas.height);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer())
		
		document.body.appendChild(this.canvas);
	}
	
	update () {
		
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		
		this.gl.flush();
	}

    addTickerFucnion(func: { (delta: number): void } ) {
        this.perFrameFunctions.push(func)
    }

    run () {
        this.update()
        this.perFrameFunctions.forEach(func => func(Date.now() - this.lastTime))
        this.lastTime = Date.now()
        requestAnimationFrame(() => {
            this.run()
        });
    }
}

export { Engine }