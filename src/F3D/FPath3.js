/**
 *  
 *	FPath3.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *
 *	3D Path Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	TODO: maek FPath3 an extension of paper.Item
frederickkPaper.F3D.FPath3 = Item.extend({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------


});
*/
frederickkPaper.F3D.FPath3 = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public

	// temporary until I figure out how
	// to extend paper.Item properly
	this.path;

	this.name = '';
	this.closed = false;

	this.opacity = 1.0;
	this.blendMode = 'normal';
	this.visible = true;
	this.selected = false;

	this.fillColor;

	this.strokeColor;
	this.strokeWidth = 1;
	this.strokeCap;
	this.strokeJoin;

	this.rotation = new frederickkPaper.F3D.FPoint3();
	this.translation = new frederickkPaper.F3D.FPoint3();


	// private
	var scene = _scene;

	var points3 = [];

	var matrix = new Matrix3D();

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;

	var translationX = 0;
	var translationY = 0;
	var translationZ = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		var path = new paper.Path();
		path.name = this.name;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			path.add( new paper.Point( pt3.x2D(), pt3.y2D() ) );
		}

		// ! temporary see above !
		path.opacity = this.opacity;
		path.blendMode = this.blendMode;
		path.visible = this.visible;
		path.selected = this.selected;

		path.fillColor = this.fillColor;

		path.strokeColor = this.strokeColor;
		path.strokeWidth = this.strokeWidth;
		path.strokeCap = this.strokeCap;
		path.strokeJoin = this.strokeJoin;

		path.closed = this.closed;

		this.path = path;
		return this.path;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _scene
	 *			scene to associate points with
	 */
	this.addToScene = function(_scene) {
		for(var i=0; i<points3.length; i++) {
			points3[i].setup(_scene);
		}
	};

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	this.add = function(_fpoint3) {
		points3[points3.length] = _fpoint3;
	};


	// ------------------------------------------------------------------------
	this.translate = function(_x, _y, _z) {
		translationX = _x != undefined ? _x : 0;
		translationY = _y != undefined ? _y : 0;
		translationZ = _z != undefined ? _z : 0;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			pt3.setX( (pt3.x() + translationX) );
			pt3.setY( (pt3.y() + translationY) );
			pt3.setZ( (pt3.z() + translationZ) );
		}
	};


	// ------------------------------------------------------------------------
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};


	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.path;
	};


};


