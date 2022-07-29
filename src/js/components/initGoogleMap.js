import {isMobile} from '../helpers/detect-device';
import myMarkers from '../../mapMarkers.json';
import lightOrDarkColor from '../components/lightOrDarkColor';
import mapStyles from './mapStyles';

export default () => {
    const mapWrapper = document.querySelector('#colorMap');
    const mapElement = document.getElementById('map');

    const AllInits = (selector) => {
        let map;
        let uluru = {lat: 40.70574060321709, lng: -73.87745364891309};
        let zoom = 12.9;

        // Set center & zoom for tablet & mobile
        if (window.innerWidth < 1200 && window.innerWidth >= 768) {
            uluru = {lat: 40.70574060321709, lng: -73.84745364891309};
            zoom = 11.5;
        }
        if (window.innerWidth < 768) {
            uluru = {lat: 40.70574060321709, lng: -73.84745364891309};
            zoom = 11.4;
        }

        const initMap = () => {
            const styledMapType = new google.maps.StyledMapType(
                mapStyles(),
                {name: "Styled Map"}
            );
            map = new google.maps.Map(mapElement, {
                zoom: zoom,
                center: uluru,
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
                },
            });

            // Add overlay polygon shapes onto google map
            map.data.loadGeoJson('../../boroughBoundaries.json');
            map.data.setStyle({
                fillColor: 'transparent',
                strokeColor: '#818080',
                strokeWeight: 2
            });

            // Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set("styled_map", styledMapType);
            map.setMapTypeId("styled_map");
        }

        initMap();

        // Zoom in / out
        const zoomIn = selector.querySelector('.js-zoom-in');
        const zoomOut = selector.querySelector('.js-zoom-out');

        const setZoom = (btn, more) => {
            if (btn) {
                btn.addEventListener('click', () => {
                    more
                        ? map.setZoom(map.getZoom() + 1)
                        : map.setZoom(map.getZoom() - 1)
                });
            }
        }
        setZoom(zoomIn, true);
        setZoom(zoomOut, false)

        // Markers actions
        const jsonData = myMarkers.markers;
        let markers = [];

        const shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: "poly",
        };

        // choose colors helper
        const chooseColor = (color) => jsonData.filter(point => point.color === color);

        // add marker helper
        const addMarker = (point) => {
            const svgMarker = {
                path: "M 6, 12 a 6, 6 0 1,1 12,0 a 6, 6 0 1,1 -12,0",
                fillColor: point.color,
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 1,
                anchor: new google.maps.Point(12, 12),
                size: new google.maps.Size(12, 12),
            };

            const marker = new google.maps.Marker({
                position: {lat: point.lat, lng: point.lng},
                map,
                icon: svgMarker,
                shape: shape,
                id: point.color,
                title: '',
                zIndex: 5,
            });

            markers.push(marker);
        }

        // add marker to map
        const placeMarkers = (data) => {
            data.forEach(point => addMarker(point));
        }

        // set map on all markers in array
        const setMapOnAll = (map) => {
            markers.forEach(marker => {
                marker.setMap(map);
            })
        }

        // hide / show markers currently in array
        const hideMarkers = () => setMapOnAll(null);
        const showMarkers = () => setMapOnAll(map);

        // delete markers and clean array
        const deleteMarkers = () => {
            hideMarkers();
            markers = [];
        }

        // init & actions
        const navbar = selector.querySelector('.js-map-navbar');
        const collections = [...selector.querySelectorAll('.js-collection-item')];
        const jsHoverEls = [...selector.querySelectorAll('.js-point-hover')];

        const showCollection = (color) => {
            const colorCollection = selector.querySelector(`${'.js-collection-item[data-collection="' + color + '"]'}`);

            selector.classList.add('has-opened');
            selector.style.setProperty("--bg", color);
            // selector.style.backgroundColor = color;
            navbar.classList.add('has-chosen-collection');
            // navbar.style.setProperty('--color', color);
            collections.forEach(c => {
                if (c.classList.contains('is-visible')) c.classList.remove('is-visible');
            });
            colorCollection.classList.add('is-visible');
            lightOrDarkColor(colorCollection, color);
        }

        // hide collection
        const hideCollection = () => {
            if (selector.classList.contains('has-opened')) selector.classList.remove('has-opened');
            if (navbar.classList.contains('has-chosen-collection')) navbar.classList.remove('has-chosen-collection');
            navbar.style.setProperty('--color', '');
            collections.forEach(c => {
                if (c.classList.contains('is-visible')) c.classList.remove('is-visible');
            });
        }

        // remove hovered img & icon visible classes
        const removeClasses = () => {
            jsHoverEls.forEach(el => {
                el.classList.remove('is-visible');

                if (el.classList.contains('js-point-img')) {
                    const imgs = [...el.querySelectorAll('img')];
                    imgs.forEach(img => {
                        img.classList.remove('in-visible');
                    });
                }
            })
        }

        const markersActions = (callbackClick = null) => {
            // show hovered img & icon
            const showHoveredEls = (e, marker) => {
                const touchLeft = (mapElement.clientWidth / 2) + e.pixel.x;
                const touchTop = ((mapElement.clientHeight - 20) / 2 + e.pixel.y);

                jsHoverEls.forEach(el => {
                    el.classList.add('is-visible');
                    setTimeout(() => {
                        // for all devices
                        el.style.left = `${touchLeft}px`;
                        el.style.top = `${touchTop}px`;
                    }, 0)

                    const imgs = [...el.querySelectorAll('img')];
                    const getImg = marker.id;
                    imgs.forEach(img => {
                        img.classList.remove('in-visible');
                        setTimeout(() => {
                            if (img.classList.contains(getImg)) img.classList.add('in-visible');
                        }, 0)
                    });
                })
            }

            // hide hovered on document click
            document.addEventListener('click', (e) => {
                if (isMobile().mobile && !e.target.closest('#map')) {
                    removeClasses();
                }
            })

            // hide hovered on map events
            google.maps.event.addListener(map, 'drag', () => removeClasses());
            google.maps.event.addListener(map, 'zoom_changed', () => removeClasses());
            google.maps.event.addListener(map, 'idle', () => removeClasses());


            markers.forEach(marker => {
                // marker click
                marker.addListener('click', e => {
                    if (!selector.classList.contains('has-opened')) {
                        const getColor = marker.id;

                        callbackClick(getColor);
                        removeClasses();
                    }
                    if (isMobile().mobile) showHoveredEls(e, marker);


                    document.querySelector(".gm-style div").classList.add("markerClass")
                });

                // marker hover over
                marker.addListener('mouseover', e => {
                    removeClasses();
                    showHoveredEls(e, marker);
                })

                // marker hover out
                marker.addListener('mouseout', e => {
                    removeClasses();
                })
            })
        }

        // color radio icons click
        document.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains('js-radio-input')) {
                const getColor = target.closest('.js-radio').getAttribute('data-color');

                deleteMarkers();

                if (getColor !== 'all-colors') {
                    const data = chooseColor(getColor);
                    data.forEach(d => addMarker(d));
                    showCollection(getColor);

                    markersActions();

                } else {
                    placeMarkers(jsonData);
                    hideCollection();

                    const triggerClick = (color) => {
                        const colorInput = selector
                            .querySelector(`${'.js-radio[data-color="' + color + '"]'}`)
                            .querySelector('.js-radio-input');
                        colorInput.click();
                    }

                    markersActions(triggerClick);
                }
            }
        })

        // default active
        selector.querySelector('.js-radio[data-color="all-colors"]').click();
    }

    AllInits(mapWrapper);

    // window resize helper
    let timer;
    let ww = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== ww) {
            ww = window.innerWidth;
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                AllInits(mapWrapper);
            }, 300);
        }
    });
}
