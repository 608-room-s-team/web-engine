
import { Engine } from "./engine"

import vs from "../shaders/vertext_shader.glsl"
import fs from "../shaders/fragment_shader.glsl"

const MyEngine = new Engine();

const { gl } = MyEngine

var vertShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertShader, vs)
gl.compileShader(vertShader)

var fragShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragShader, fs)
gl.compileShader(fragShader)

var shaderProgram = <WebGLProgram>gl.createProgram()
gl.attachShader(shaderProgram, vertShader)
gl.attachShader(shaderProgram, fragShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

var coord = gl.getAttribLocation(shaderProgram, "coordinates")
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(coord)

// console.log(vs);
// console.log(fs);


MyEngine.addTickerFucnion((delta: number) => {
    // console.log(delta)

    gl.clear(gl.COLOR_BUFFER_BIT)
	
	// The points of our triangles we want to draw.
	// x,y positions. 0,0 is the center of the canvas. -1,1 is the top left.
	var vertices = [
		-0.5+Math.sin(Date.now()*.01), 0.5,
		-0.5, -0.5,
		0.5, -0.5, 
		// Another small triangle for fun.
		-0.7, 0.0,
		-0.8, -0.2,
		-0.6, -0.1,
	]

	// Tell webGL to draw these triangles this frame.
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

	// Draw all the triangles.
	gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2)
})

MyEngine.run()