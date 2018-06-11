import React from 'react'

function MultiPhotoDisplay (props) {
  const { photos } = props
  const { selected, changeSelected } = props.multi
  return (
    <div className="multiPhoto">
      {/* <img className="largePhoto" src={photos[selected]} /> */}
      <div className="photoBar" >
        {
          photos.map((photo, index) => {
              return <div className="row" key={photo.id}><img src={photo} className="smallPhoto" onClick={() => changeSelected(index)} /></div>
          })
        }
      </div>
    </div>)
}

export default MultiPhotoDisplay

{/* <MultiPhotoDisplay photos={product.images} selected={this.state.selected} changeSelected={this.changeSelectedPhoto}/> */}
