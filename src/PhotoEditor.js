import React from 'react'
import { Div, Img } from 'glamorous'
import Modal from 'react-modal'
import Cropper from 'cropperjs'
import Slider from './Slider'
Modal.setAppElement('body')

const DEFAULT_IMAGES = [
  {
    id: '1470619549108-b85c56fe5be8',
    caption: 'Photo by Alan Emery',
    orientation: 'square',
    useForDemo: true
  }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
  {
    id: '1471079502516-250c19af6928',
    caption: 'Photo by Jeremy Bishop',
    orientation: 'landscape',
    useForDemo: true
  }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
  {
    id: '1454023492550-5696f8ff10e1',
    caption: 'Photo by Jessica Weiller',
    orientation: 'landscape',
    useForDemo: true
  }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
  {
    id: '1470854989922-5be2f7456d78',
    caption: 'Photo by Piotr Łaskawski',
    orientation: 'landscape',
    useForDemo: true
  }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
  {
    id: '1470317596697-cbdeda56f999',
    caption: 'Photo by Michel Bosma',
    orientation: 'landscape',
    useForDemo: true
  } // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
]

function makeUnsplashSrc(id) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=300&h=300`
}
function makeUnsplashSrcSet(id, size) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`
}
function makeUnsplashThumbnail(id, orientation = 'landscape') {
  const dimensions = orientation === 'square' ? 'w=300&h=300' : 'w=240&h=159'

  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`
}
export default class PhotoEditor extends React.Component {
  state = {
    isOpen: false,
    zoomLevel: 0,
    aspectRatio: {
      value: 16 / 9,
      name: '16:9'
    },
    croppedImage: null,
    currentImage: makeUnsplashSrc(DEFAULT_IMAGES[0].id)
  }

  componentDidMount() {
    this.initCropper()
  }

  changeImage = src => {
    this.setState({
      currentImage: src
    })
    this.changeCropperImage(src)
  }

  changeCropperImage = src => {
    this.cropper.clear().replace(src)
  }

  initCropper = () => {
    this.cropper = new Cropper(this.cropperElement, {
      preview: this.previewElement,
      aspectRatio: 16 / 9,
      zoomOnTouch: false,
      zoomOnWheel: false,
      viewMode: 0,
      crop: function(e) {}
      //   zoom:  (e)=> {
      //     console.log(e.type, e.detail.ratio);
      //     this.setState({
      //         zoomLevel: e.detail.ratio
      //     })
      //   }
    })
  }

  closeModal = () => {
    this.cropper = null
    this.setState({
      isOpen: false
    })
  }

  openModal = () => {
    this.setState({
      isOpen: true
    })
  }

  onAfterOpen = () => {
    // this.initCropper()
  }

  onRatioChanged = ratio => {
    // this.initCropper()
    this.setState({
      aspectRatio: ratio
    })
    this.cropper.setAspectRatio(ratio.value)
  }

  onZoomChange = zoomLevel => {
    const zoomRatio = zoomLevel - this.state.zoomLevel
    this.cropper.zoom(zoomRatio)
    this.setState({
      zoomLevel
    })
  }

  rotate = () => {
    this.cropper.rotate(90)
  }

  getCroppedImage = () => {
    const croppedImage = this.cropper
      .getCroppedCanvas()
      .to('image/jpeg', 1.0)
    this.setState({
      croppedImage
    })
    debugger
  }

  render() {
    return (
      <Div>
        <Div onClick={this.openModal}>Open Modal</Div>
        {/* <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          onAfterOpen={this.onAfterOpen}
        > */}
        <Div
          onClick={() => {
            this.getCroppedImage()
          }}
        >
          getCroppedImage
        </Div>
        <Img src={this.state.croppedImage} />
        <Div borderRadius="3px" border="1px solid #e1e1e1">
          <Div
            display="flex"
            justifyContent="space-between"
            color="#3e3e3e"
            fontSize="22px"
            fontWeight="600"
            height="70px"
            alignItems="center"
            padding="0 10px"
            borderBottom="1px solid #e1e1e1"
          >
            <Div>Edit Photo</Div>
            <Div onClick={this.closeModal}>X</Div>
          </Div>
          <Div display="flex">
            <Div
              width="150px"
              overflowY="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              paddingTop="16px"
            >
              {DEFAULT_IMAGES.map(imageConfig => {
                const src = makeUnsplashSrc(imageConfig.id)
                return (
                  <Img
                    key={src}
                    height={100}
                    width={100}
                    src={src}
                    onClick={() => this.changeImage(src)}
                    marginBottom="8px"
                    borderRadius="3px"
                  />
                )
              })}
            </Div>
            <Div flex="1">
              <Div display="flex">
                <Div
                  flex="1"
                  position="relative"
                  display="flex"
                  justifyContent="center"
                >
                  <Img
                    crossOrigin="true"
                    innerRef={cropperElement => {
                      this.cropperElement = cropperElement
                    }}
                    src={this.state.currentImage}
                  />
                  <Div
                    position="absolute"
                    bottom="10px"
                    background="rgba(0, 0, 0, 0.3)"
                    borderRadius="3px"
                    display="inline-flex"
                    color="white"
                  >
                    {[
                      { value: 16 / 9, name: '16:9' },
                      { value: 4 / 3, name: '4:3' },
                      { value: 1, name: '1:1' },
                      { value: 2 / 3, name: '2:3' },
                      { value: 2 / 1, name: '2:1' }
                    ].map((ratio, index) => {
                      return (
                        <Div
                          key={ratio.value}
                          width="50px"
                          height="36px"
                          background={
                            ratio.value === this.state.aspectRatio.value
                              ? 'black'
                              : 'transparent'
                          }
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          onClick={() => this.onRatioChanged(ratio)}
                        >
                          {ratio.name}
                        </Div>
                      )
                    })}
                  </Div>
                </Div>
                <Div
                  width="200px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Div
                    width="150px"
                    fontSize="22px"
                    fontWeight="600"
                    marginTop="16px"
                    color="3e3e3e"
                    textAlign="left"
                  >
                    Preview
                  </Div>
                  <Div
                    marginTop="16px"
                    width="150px"
                    height="300px"
                    overflow="hidden"
                    innerRef={previewElement => {
                      this.previewElement = previewElement
                    }}
                  />
                </Div>
              </Div>
              <Div
                display="flex"
                justifyContent="space-between"
                height="70px"
                alignItems="center"
              >
                <Div width="500px" marginTop="15px" height="35px">
                  <Slider
                    step={0.1}
                    value={this.state.zoomLevel}
                    domain={[-1, 1]}
                    onUpdate={this.onZoomChange}
                  />
                </Div>
                <Div background="red" onClick={() => this.rotate()}>
                  Rotate
                </Div>
              </Div>
              <Div
                height="90px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderTop="1px solid #e1e1e1"
                padding="24px"
              >
                <Div display="flex">
                  <Div>Reset</Div>
                  <Div maginLeft="12px">Delete</Div>
                </Div>
                <Div display="flex">
                  <Div
                    height="40px"
                    border="1px solid #33a0e8"
                    borderRadius="3px"
                    color="#33a0e8"
                    fontWeight="600"
                    fontSize="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="0 10px"
                    marginLeft="12px"
                  >
                    Change photo
                  </Div>
                  <Div
                    height="40px"
                    backgroundColor="#33a0e8"
                    borderRadius="3px"
                    color="white"
                    fontWeight="600"
                    fontSize="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="0 10px"
                    marginLeft="12px"
                  >
                    Apply
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
        {/* </Modal> */}
      </Div>
    )
  }
}
