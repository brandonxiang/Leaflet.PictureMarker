L.PictureMarker = L.Path.extend({
    options: {
        draggable: false,
        icon: "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/marker-icon.png"
    },

    initialize: function (latlng, options) {
        L.setOptions(this, options);
        this._latlng = L.latLng(latlng);
        this._icon = this.options.icon;
    },

    setLatLng: function (latlng) {
        this._latlng = L.latLng(latlng);
        this.redraw();

    },

    getLatLng: function () {
        return this._latlng;
    },

    _project: function () {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        this._updateBounds();
    },

    _updateBounds: function () {
        var img = new Image();
        img.src = this._icon;
        var width = img.width / 2,
            height = img.height,
            w = this._clickTolerance(),
            topleft = [width + w, height + w],
            bottonright = [width + w, w];


        this._pxBounds = new L.Bounds(this._point.subtract(topleft), this._point.add(bottonright));
    },

    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    _updatePath: function () {
        this._renderer._updatePicMarker(this);
    },

    _empty: function () {
        return this._icon && !this._renderer._bounds.intersects(this._pxBounds);
    },

    _containsPoint: function (p) {
        return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
    }

});

L.pictureMarker = function (latlng, options) {
    return new L.PictureMarker(latlng, options);
};


L.Canvas.include({
    _updatePicMarker: function (layer) {
        if (layer._empty()) { return; }
        var p = layer._point,
            ctx = this._ctx;

        this._drawnLayers[layer._leaflet_id] = layer;
        var img = new Image();
        img.src = layer._icon;
        ctx.drawImage(img, p.x- img.width/2, p.y-img.height);
    }
});
