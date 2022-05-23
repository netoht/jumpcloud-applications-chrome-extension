function showLogin(obj) {
  document.getElementById('login').style.display = 'block';
  if (Object.keys(obj).length !== 0) {
    document.getElementById('error').innerHTML = JSON.stringify(obj);
  }
}

const getApps = () => {
  fetch('https://console.jumpcloud.com/userconsole/api/applications')
    .then((res) => {
      res
        .json()
        .then((data) => {
          let items = '';
          if (data) {
            for (let item of data) {
              items = items.concat(`
          <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="${item.ssoUrl}"
          >
            <div class="appLogoContainer"><img class="appLogo" src="${item?.logo?.url}" /></div>
            <div class="appName"><strong>${item.displayLabel}</strong></div>
          </a>
        </li>
        `);
            }
            document.getElementById('appsList').innerHTML = items;
          }
        })
        .catch((err) => {
          showLogin(err);
        });
    })
    .catch((err) => {
      showLogin(err);
    });
};

getApps();
