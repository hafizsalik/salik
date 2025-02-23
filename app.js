document.addEventListener('DOMContentLoaded', () => {
    const rssFeedUrl = 'https://cors-anywhere.herokuapp.com/https://nashriyafetrat.blogfa.com//rss';
    const contentDiv = document.getElementById('content');

    fetch(rssFeedUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'text/xml');
            const items = xml.querySelectorAll('item');

            let html = '';
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                html += `<div><h2><a href="${link}" target="_blank">${title}</a></h2></div>`;
            });

            contentDiv.innerHTML = html || '<p>مطلبی یافت نشد.</p>';
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>خطا در بارگذاری مطالب.</p>';
        });
});