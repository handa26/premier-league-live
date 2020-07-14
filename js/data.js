const base_url = "https://api.football-data.org/v2/";
const API_TOKEN = "f6eaba8cca4a4822a1272f7da47208d1";
const standing = `${base_url}competitions/2021/standings`;
const match = `${base_url}competitions/2021/matches`;
const teams = `${base_url}competitions/2021/teams`;
const teamd = `${base_url}teams/`;

const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });
};

const status = (response) => {
  if (response.status !== 200) {
    console.log("Error: " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
};

const json = (response) => {
  return response.json();
};

const error = (error) => {
  console.log("Error: " + error);
};

// Request Data
const getTeams = () => {
  if ("caches" in window) {
    caches.match(teams).then((response) => {
      if (response) {
        response.json().then((data) => {
          const { teams } = data;
          let teamsHTML = "";
          teams.forEach(({ crestUrl, id, name, venue }) => {
            teamsHTML += `
                  <ul class="collection">
                    <li class="collection-item avatar">
                        <img src="${crestUrl}" alt="" class="circle">
                        <span class="title"><a href="./teamsInfo.html?id=${id}">${name}</a></span>
                        <p>${venue}</p>
                    </li>
                  </ul>
                `;
            document.getElementById("body-content").innerHTML = teamsHTML;
          });
        });
      }
    });
  }

  fetchApi(teams)
    .then(status)
    .then(json)
    .then((data) => {
      const { teams } = data;
      let teamsHTML = "";
      teams.forEach(({ crestUrl, id, name, venue }) => {
        teamsHTML += `
                  <ul class="collection">
                    <li class="collection-item avatar">
                        <img src="${crestUrl}" alt="" class="circle">
                        <span class="title"><a href="./teamsInfo.html?id=${id}">${name}</a></span>
                        <p>${venue}</p>
                    </li>
                  </ul>
                `;
      });
      document.getElementById("body-content").innerHTML = teamsHTML;
    })
    .catch(error);
};

const getTeamsById = () => {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(teamd + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            const { name, crestUrl, founded, address, venue, website } = data;

            let teamsInfo = `
            <div class="center-align">
              <h3>${name}</h3>
              <img class="responsive-img" src="${crestUrl}" alt="${name}" />
            </div>
            <ul class="collection">
              <li class="collection-item">
                <span class="title"><h5>Founded</h5></span>
                <p>${founded}</p>
              </li>
              <li class="collection-item">
                <span class="title"><h5>Address</h5></span>
                <p>${address}</p>
              </li>
              <li class="collection-item">
                <span class="title"><h5>Stadium</h5></span>
                <p>${venue}</p>
              </li>
              <li class="collection-item">
                <span class="title"><h5>Website</h5></span>
                <p><a href="${website}">${website}</a></p>
              </li>
            </ul>
          `;
            document.getElementById("content").innerHTML = teamsInfo;
            resolve(data);
          });
        }
      });
    }

    fetchApi(teamd + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        const { name, crestUrl, founded, address, venue, website } = data;

        let teamsInfo = `
        <div class="center-align">
          <h3>${name}</h3>
          <img class="responsive-img" src="${crestUrl}" alt="${name}" />
        </div>
        <ul class="collection">
          <li class="collection-item">
            <span class="title"><h5>Founded</h5></span>
            <p>${founded}</p>
          </li>
          <li class="collection-item">
            <span class="title"><h5>Address</h5></span>
            <p>${address}</p>
          </li>
          <li class="collection-item">
            <span class="title"><h5>Stadium</h5></span>
            <p>${venue}</p>
          </li>
          <li class="collection-item">
            <span class="title"><h5>Website</h5></span>
            <p><a href="${website}">${website}</a></p>
          </li>
        </ul>
      `;
        document.getElementById("content").innerHTML = teamsInfo;
        resolve(data);
      });
  });
};

const getMatch = () => {
  if ("caches" in window) {
    caches.match(match).then((response) => {
      if (response) {
        response.json().then((data) => {
          const { matches } = data;
          let matchData = "";
          matches.forEach((mtch) => {
            matchData += `
              <div class="col s12 m6>
                <div class="row">
                  <div class="card">
                    <div class="card-content">
                      <table class="responsive-table">
                        <tbody>
                          <tr>
                            <td>${mtch.homeTeam.name}</td>
                            <td>${mtch.score.fullTime.homeTeam}</td>
                            <td rowspan="2" class="center">${dmy(
                              new Date(mtch.utcDate)
                            )}</td> 
                          </tr>
                          <tr>
                            <td>${mtch.awayTeam.name}</td>
                            <td>${mtch.score.fullTime.awayTeam}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            `;
          });
          document.getElementById("body-content").innerHTML = matchData;
        });
      }
    });
  }

  fetchApi(match)
    .then(status)
    .then(json)
    .then((data) => {
      const { matches } = data;
      let matchData = "";
      matches.forEach((mtch) => {
        matchData += `
          <div class="col s12 m6>
            <div class="row">
              <div class="card">
                <div class="card-content">
                  <table class="responsive-table">
                        <tbody>
                          <tr>
                            <td>${mtch.homeTeam.name}</td>
                            <td>${mtch.score.fullTime.homeTeam}</td>
                            <td rowspan="2" class="center">${dmy(
                              new Date(mtch.utcDate)
                            )}</td> 
                          </tr>
                          <tr>
                            <td>${mtch.awayTeam.name}</td>
                            <td>${mtch.score.fullTime.awayTeam}</td>
                          </tr>
                        </tbody>
                      </table>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      document.getElementById("body-content").innerHTML = matchData;
    })
    .catch(error);
};
function dmy(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const getStandings = () => {
  if ("caches" in window) {
    caches.match(standing).then((response) => {
      if (response) {
        response.json().then((data) => {
          const { standings } = data;
          let standingsHTML = "";
          standings.forEach((std) => {
            let standingsDetail = "";
            std.table.forEach((pos) => {
              standingsDetail += `
                <tr>
                  <td class="center">${pos.position}</td>
                    <td>${pos.team.name}</td>
                    <td>${pos.playedGames}</td>
                    <td>${pos.won}</td>
                    <td>${pos.draw}</td>
                    <td>${pos.lost}</td>
                    <td>${pos.goalsFor}</td>
                    <td>${pos.goalsAgainst}</td>
                    <td>${pos.goalDifference}</td>
                  <td>${pos.points}</td>
                </tr>
              `;
            });
            standingsHTML =
              `
              <table class="highlight responsive-table">
                <thead>
                  <tr>
                    <th class="center">Position</th>
                      <th>Team</th>
                      <th>MP</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>GF</th>
                      <th>GA</th>
                      <th>GD</th>
                      <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  ` +
              standingsDetail +
              `
                </tbody>
              </table>
            `;
          });
          document.getElementById("body-content").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetchApi(standing)
    .then(status)
    .then(json)
    .then((data) => {
      const { standings } = data;
      let standingsHTML = "";
      standings.forEach((std) => {
        let standingsDetail = "";
        std.table.forEach((pos) => {
          standingsDetail += `
            <tr>
              <td class="center">${pos.position}</td>
                <td>${pos.team.name}</td>
                <td>${pos.playedGames}</td>
                <td>${pos.won}</td>
                <td>${pos.draw}</td>
                <td>${pos.lost}</td>
                <td>${pos.goalsFor}</td>
                <td>${pos.goalsAgainst}</td>
                <td>${pos.goalDifference}</td>
                <td>${pos.points}</td>
            </tr>
          `;
        });
        standingsHTML +=
          `
          <table class="highlight responsive-table">
            <thead>
              <tr>
                <th class="center">Position</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              ` +
          standingsDetail +
          `
            </tbody>
          </table>
        `;
      });
      document.getElementById("body-content").innerHTML = standingsHTML;
    })
    .catch(error);
};

const getSaved = () => {
  getAll().then((data) => {
    let teamsDetail = "";
    data.forEach(({ crestUrl, id, name, venue }) => {
      teamsDetail += `
        <ul class="collection">
          <li class="collection-item avatar">
            <img src="${crestUrl}" alt="" class="circle">
            <span class="title"><a href="./teamsInfo.html?id=${id}&saved=true">${name}</a></span>
            <p>${venue}</p>
          </li>
        </ul>
      `;
    });
    document.getElementById("body-content").innerHTML = teamsDetail;
  });
};

const getSavedTeamById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getSavedById(idParam).then((dataTeam) => {
    const { name, crestUrl, founded, address, venue, website } = dataTeam;
    let teamSavedHTML = `
      <div class="center-align">
        <h3>${name}</h3>
        <img class="responsive-img" src="${crestUrl}" alt="${name}" />
      </div>
      <ul class="collection">
        <li class="collection-item">
          <span class="title"><h5>Founded</h5></span>
          <p>${founded}</p>
        </li>
        <li class="collection-item">
          <span class="title"><h5>Address</h5></span>
          <p>${address}</p>
        </li>
        <li class="collection-item">
          <span class="title"><h5>Stadium</h5></span>
          <p>${venue}</p>
        </li>
        <li class="collection-item">
          <span class="title"><h5>Website</h5></span>
          <p><a href="${website}">${website}</a></p>
        </li>
      </ul>
    `;
    document.getElementById("content").innerHTML = teamSavedHTML;
  });
};
