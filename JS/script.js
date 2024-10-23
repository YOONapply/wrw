// 마우스를 올렸을 때 이미지를 변경하는 이벤트
pin.forEach((data)=>{
    data.addEventListener("mouseover",()=>{
        data.src = "Images/pin_hover.png"
    })
});


// 마우스가 떠났을 때 일어나는 이벤트
pin.forEach((data)=>{
    data.addEventListener("mouseout",()=>{
        data.src = "Images/pin_1.png"
    })
});

