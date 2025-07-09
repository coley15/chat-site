import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://xmgxyiauccvksndltcox.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZ3h5aWF1Y2N2a3NuZGx0Y294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTE2MzksImV4cCI6MjA2NzU4NzYzOX0.a7rA3ZXyWbOKZAfjZj8-882rBrmq64sRj7Are7R7R6U'
);

const form = document.querySelector('form');
const input = document.getElementById('text-input')
const message_container = document.getElementById('message-container')
const username = document.getElementById('username-area');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Ensures the page does not refresh when a message is submitted

    const content = input.value.trim();
    const name = username.value.trim();

    console.log(name);

    if (!content || !name) return;

    const { error } = await supabase
        .from('messages')
        .insert([{ content: content, username: name }])

    if (error) {
        console.error(error)
    } else {
        input.value = '';
        fetchMessages();
    }
});

async function fetchMessages() {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true});

    if (error) {
        console.error('Fetch error: ', error)

        return;
    }

    message_container.innerHTML = '';
    data.forEach((msg) => {
        const p = document.createElement('p');
        p.textContent = `${msg.username}: ${msg.content}`
        p.className = 'text-white mb-1';
        message_container.appendChild(p);
    })

    console.log(data)
}

fetchMessages();