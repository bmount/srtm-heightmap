## Terrain data for web maps, games, visualizations

This is a little utility for generating heightmaps from
[Shuttle Radar Topography Mission](http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/) 
records.

They may be somewhat visually meaningful on their own,
but mostly they're a convenient way to pack three dimensional
data into a format browsers understand for
applications [like this](http://maxogden.github.com/voxel-city/?url=simple_sf.png).

### FORMAT:

Red channel: `floor ( height / 256 )` (measurement in meters)

Green channel: `height mod 256`

Blue channel: centimeters offset from `r*256 + b` (not used in SRTM,
sort of left here in case some client stuff ever gets written
that could use more precision.)

Alpha channel: Just a switch indicating negative or positive. 255 or
any other value means positive, 21 (`0x15` the ASCII code for negative 
acknowledge character (tee hee)) means negative.

Elevation equals 
    ( RED * 256 + GREEN + BLUE/100 ) * (ALPHA == 21) * (-1)
Unprojected lon lat coordinates can be calculated
from the images + file names.

### The good news

is that this simple format is sufficient to encode every point on
earth to a precision of 1 cm, including the ocean floors!

### The bad news

is that it's not obvious how to assign arbitrary points to SRTM 
"Regions", so you have to script it yourself if you want to do 
something huge, otherwise just
go here: 
[http://maxogden.github.com/voxel-city/?url=simple_sf.png](http://maxogden.github.com/voxel-city/?url=simple_sf.png)
and pass the relevant url to the flag as in the examples.

### You could also

maybe specify `--image-format tif` and then georeference the tif and
upload to mapbox.

### Examples

Download and create PNG of the SRTM data for N 38 W 97 to N 39 W 96:

    hgt2png --url http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/Region_03/N38W097.hgt.zip

Use, resize or reuse a file you already downloaded:

    hgt2png --file N38W097.hgt

Render a smaller area of that hgt record:

    hgt2png --file N38W097.hgt --bbox -96.8 38.2 -96.6 38.5
        
Render a square area of that tile:
        
    hgt2png --square --file N38W097.hgt --bbox -96.8 38.2 -96.6 38.5

Render an interesting part of Death Valley starting from nothing:

    hgt2png --url http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/Region_04/N36W117.hgt.zip --bbox -117.452087 36.642529 -117.053146 36.848307


### License: MIT
