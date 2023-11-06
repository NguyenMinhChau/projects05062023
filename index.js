const btn = document.getElementById('button');

const input1 = document.getElementById('user_name')
const input2 = document.getElementById('phone')

const name_own = document.getElementById('name_own')
const number_contract = document.getElementById('number_contract')


const urlParams = new URLSearchParams(window.location.search);
const macont = urlParams.get('macont');
const mac_client = urlParams.get('mac_client');



name_own.innerText = macont;
number_contract.innerText = mac_client;


//! Call API get data info

//! API submit
btn.addEventListener('click', async () => {
	const body = {
		userAgent: window.navigator.userAgent,
		macont: input1.value,
		mac_client: input2.value,
	}

	console.log(body);

})