import React from 'react';
import styled from 'styled-components';
export default function Title({ name, title }) {
    return (
        <TitleContainer>
            <div className="row">
                <div className="col-10 mx-auto my-2 text-center text.title">
                    <h1 className="text-capitalize font-weight-bold">
                        {name} <strong className="text-blue">{title}</strong>

                    </h1>
                    <div className="img-container col-10 mx-auto my-2 text-center text.title">
                        <img className="ahora-logo" src="img/ahora12.png" />
                    </div>
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