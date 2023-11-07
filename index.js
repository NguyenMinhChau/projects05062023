// const btn = document.getElementById('button');
// const informationElement = document.getElementById('information');

// const input1 = document.getElementById('user_name');
// const input2 = document.getElementById('phone');

// const name_own = document.getElementById('name_own');
// const number_contract = document.getElementById('number_contract');

// const urlParams = new URLSearchParams(window.location.search);
// const macont = urlParams.get('macont');
// const mac_client = urlParams.get('mac_client');

// name_own.innerText = macont;
// number_contract.innerText = mac_client;

// //! Call API get data info

// //! API submit
// btn.addEventListener('click', async () => {
// 	const body = {
// 		userAgent: window.navigator.userAgent,
// 		macont: input1.value,
// 		mac_client: input2.value,
// 	};

// 	console.log(body);
// });

// //! HANDLE ERROR WHEN MA CONTRACT IS NOT EXIST
// const htmls = `
// <div style='display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%'>
// 	<div style='display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff'>
// 		<h4 style='margin: 10px 0;'>Thông báo Quý Khách với Khách Hàng</h4>
// 		<p style='margin: 0; line-height: 1.6'>Hệ thống đang bảo trì</p>
// 		<p style='margin: 0; line-height: 1.6'>Vui lòng thử lại sau, xin cảm ơn!</p>
// 		<img
// 		src='./cog-image.png'
// 		alt='image'
// 		style='width: 100%; max-width: 300px; margin-top: 10px; object-fit: contain'
// 		/>
// 	</div>
// </div>
// `;
// informationElement.innerHTML = htmls;
