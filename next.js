const state = {
  count: 0,
};

const increment = () => ++state.count;

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const logState = () => {
  console.log("Current state:", state);
};

const init = async () => {
  logState();

  try {
    const data = await fetchJson("https://jsonplaceholder.typicode.com/todos/1");
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export { state, increment, fetchJson, logState, init };

const WHATSAPP_PHONE = "+918306224244";
const PHP_ENDPOINT = "next.php";

const getFormData = () => ({
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  message: document.getElementById('message').value,
});

const sendToWhatsApp = (event) => {
  event.preventDefault();

  const { name, email, message } = getFormData();
  const text = `Hello, my name is *${name}*.\nEmail: *${email}*\n\nMessage:\n${message}`;
  const encodedText = encodeURIComponent(text);
  const whatsappURL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

  window.open(whatsappURL, '_blank');
};

const sendFormData = async () => {
  const jsonobject = getFormData();

  try {
    const response = await fetch(PHP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonobject),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    console.log('Data sent to next.php:', jsonobject);
    const parsedData = JSON.parse(JSON.stringify(jsonobject));
    console.log('Parsed JSON object:', parsedData);
  } catch (error) {
    console.error('Error sending form data:', error);
  }
};
