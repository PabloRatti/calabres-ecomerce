import React from 'react';
import styled from 'styled-components';
export default function Title({ name, title,renderLogo,width,profile,rodado }) {
    
    return (
        <TitleContainer>
            <div className="row">
                <div className="col-10 mx-auto my-2 text-center text.title">
                    <h1 className="text-capitalize font-weight-bold">
                        {name} <strong className="text-blue">{title}&nbsp;</strong>{width}{width ? '/' : ''}<strong>{profile}{profile ? '/' : ''}</strong><strong>{rodado}</strong>

                    </h1>
                    {renderLogo ? 
                    <div className="img-container col-10 mx-auto my-2 text-center text.title">
                            <img alt="ahora-logo" className="ahora-logo" src={require("../calabres-api/images/static/ahora12.png")} />
                    </div>
                    : null}
                </div>
            </div>
        </TitleContainer>
    );
}


const TitleContainer = styled.div`  
    margin-bottom: 3rem;
  .ahora-logo{
      height: 5rem;     
  }
  .img-container{
      top: 1rem;
  }
`;