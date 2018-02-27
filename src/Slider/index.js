import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle, Track, Tick } from './components'
const sliderStyle = {
  position: 'relative',
  width: '100%'
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 8,
  borderRadius: 4,
  cursor: 'pointer',
  backgroundColor: '#d8d8d8'
}

const domain = [100, 500]
const values = [450]

class CProSlider extends Component {
  state = {
    values: [this.props.value]
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        values: [nextProps.value]
      })
    }
  }
  render() {
    const { domain, step, value, onUpdate, onChange } = this.props
    return (
      <Slider
        mode={2}
        step={step}
        domain={this.props.domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
        values={this.state.values}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={10}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    )
  }
}

export default CProSlider
