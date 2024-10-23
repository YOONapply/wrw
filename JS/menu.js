const pin = document.querySelectorAll(".pin");

const pinImages = {
    ygin: ['Images/chart1/01_graph.png', 'Images/chart1/01_wdcloud.png', 'Images/chart1/01_chart.png'],
    ygin2: ['Images/chart2/02_graph.png', 'Images/chart2/02_wdcloud.png', 'Images/chart2/02_chart.png'],
    ygin3: ['Images/chart12/12_graph.png', 'Images/chart12/12_wdcloud.png', 'Images/chart12/12_chart.png'],
    pj: ['Images/chart3/03_graph.png', 'Images/chart3/03_wdcloud.png', 'Images/chart3/03_chart.png'],
    pc: ['Images/chart9/09_graph.png', 'Images/chart9/09_wdcloud.png', 'Images/chart9/09_chart.png'],
    pc2: ['Images/chart13/13_graph.png', 'Images/chart13/13_wdcloud.png', 'Images/chart13/13_chart.png'],
    gp: ['Images/chart5/05_wdcloud.png', 'Images/chart5/05_graph.png', 'Images/chart5/05_chart.png'],
    yuju: ['Images/chart6/06_wdcloud.png', 'Images/chart6/06_graph.png', 'Images/chart6/06_chart.png'],
    gc: ['Images/chart7/07_wdcloud.png', 'Images/chart7/07_graph.png', 'Images/chart7/07_chart.png'],
    goyg: ['Images/chart8/08_wdcloud.png', 'Images/chart8/08_graph.png', 'Images/chart8/08_chart.png'],
    ygpg: ['Images/chart11/11_wdcloud.png', 'Images/chart11/11_graph.png', 'Images/chart11/11_chart.png'],
    gmpo: ['Images/chart14/14_wdcloud.png', 'Images/chart14/14_graph.png', 'Images/chart14/14_chart.png'],
    ggju: ['Images/chart15/15_wdcloud.png', 'Images/chart15/15_graph.png', 'Images/chart15/15_chart.png'],
    sgnm: ['Images/chart16/16_graph.png', 'Images/chart16/16_wdcloud.png', 'Images/chart16/16_chart.png'],
    yuwn: ['Images/chart4/04_graph.png', 'Images/chart4/04_wdcloud.png', 'Images/chart4/04_chart.png'],
    yuwn2: ['Images/chart10/10_graph.png', 'Images/chart10/10_wdcloud.png', 'Images/chart10/10_chart.png']
};

// 왼쪽에 표시할 pin ID 목록
const leftPinIds = ['pc', 'pc2', 'gp', 'ygpg', 'yuju', 'ygin', 'ygin2', 'ygin3', 'ggju'];
// 위에 표시할 pin ID 목록
const abovePinIds = ['ygin', 'ygin2', 'yuwn', 'yuwn2', 'ygin3'];

pin.forEach((data) => {
    data.addEventListener("click", () => {
        const existingDivs = document.querySelectorAll("#menu");
        existingDivs.forEach(div => div.remove());

        const rect = data.getBoundingClientRect();
        const images = pinImages[data.id] || [];
        const width = 550;
        const height = 500;
        const newWidth = width * 1.3; 
        const newHeight = height * 1;

        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', "menu");
        newDiv.style.position = 'fixed';
        newDiv.style.width = `${newWidth}px`;
        newDiv.style.height = `${newHeight}px`;
        newDiv.style.overflow = 'hidden';
        newDiv.style.opacity = 0; // Initially hidden
        newDiv.style.transition = 'opacity 1s ease'; // Fade-in effect

        // 왼쪽 또는 오른쪽에 표시
        if (leftPinIds.includes(data.id)) {
            newDiv.style.left = `${rect.left - newWidth - 5}px`; // 왼쪽에 5px 간격
        } else {
            newDiv.style.left = `${rect.right + 5}px`; // 오른쪽에 5px 간격
        }
        
        // 특정 ID에 따라 위에 표시하되, pin을 가리지 않도록 위치 조정
        if (abovePinIds.includes(data.id)) {
            newDiv.style.top = `${rect.top - newHeight + 20}px`; // pin을 가리지 않도록 조정
        } else {
            newDiv.style.top = `${rect.top}px`; // 기본 위치
        }

        if (images.length > 1) {
            const slideContainer = document.createElement('div');
            slideContainer.style.display = 'flex';
            slideContainer.style.width = `${newWidth * images.length}px`;
            slideContainer.style.transition = 'transform 0.5s ease'; // 이동 시 부드러운 효과
            slideContainer.style.overflow = 'hidden'; // 숨겨진 여백을 방지
            
            images.forEach((imageSrc) => {
                const imgDiv = document.createElement('div');
                imgDiv.style.width = `${newWidth}px`; // 각 이미지 div의 너비 설정
                imgDiv.style.height = `${newHeight}px`; // 각 이미지 div의 높이 설정
                imgDiv.style.flexShrink = '0'; // 크기 조정 방지
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.style.width = '100%'; // div에 맞춰 이미지 너비 설정
                img.style.height = '100%'; // div에 맞춰 이미지 높이 설정
                img.style.objectFit = 'cover'; // 이미지 비율 유지
                imgDiv.appendChild(img);
                slideContainer.appendChild(imgDiv);
            });

            newDiv.appendChild(slideContainer);
            document.body.appendChild(newDiv);

            // Fade in the #menu div
            setTimeout(() => {
                newDiv.style.opacity = 1; // Fade in the #menu div
            }, 100); // Delay to ensure the element is added to the DOM

            let currentIndex = 0;

            // Set initial position
            slideContainer.style.transform = `translateX(0px)`;

            const slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length; 
                slideContainer.style.transform = `translateX(-${currentIndex * newWidth}px)`; 
            }, 3000); 

            newDiv.addEventListener("mouseout", () => {
                clearInterval(slideInterval);
                newDiv.remove();
            });
        } else if (images.length === 1) {
            const imgDiv = document.createElement('div');
            imgDiv.style.opacity = 0; // Initially hidden
            imgDiv.style.transition = 'opacity 1s ease'; // Fade-in effect
            const img = document.createElement('img');
            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
            img.style.objectFit = 'cover';
            img.src = images[0];
            imgDiv.appendChild(img);
            newDiv.appendChild(imgDiv);

            document.body.appendChild(newDiv);

            // Fade in the image and #menu div
            setTimeout(() => {
                imgDiv.style.opacity = 1; // Fade in the image
                newDiv.style.opacity = 1; // Fade in the #menu div
            }, 100);
        }
    });
});
