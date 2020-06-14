import http, { makeid } from "./http";
import { list_user } from "./user";

export async function list_compteur() {
  const users = await list_user();
  const { results } = await http.get("/compteur/");

  return results.map((res) => {
    users.map((u) => {
      if (u.id === res.user_id) {
        res.user = u;
      }
    });
    return res;
  });
}

export async function list_scan(compteurs, onGetCompteurs) {
  if (compteurs.length === 0) {
    compteurs = await list_compteur();
    onGetCompteurs(compteurs);
  }
  let { results: scans } = await http.get("/scan/");
  return scans.map((scan) => {
    compteurs.map((compteur) => {
      if (compteur.id === scan.cpt_id) {
        scan.compteur = compteur;
      }
    });
    return scan;
  });
}

export function create_scan({ picture, ...data }) {
  let formdata = new FormData();
  if (picture) {
    let parts = picture.split("/");
    let filename = parts[parts.length - 1];
    parts = filename.split(".");
    formdata.append("picture", {
      uri: picture,
      name: `${makeid(60)}.${parts[parts.length - 1]}`,
      type: "multipart/form-data",
    });
  }

  Object.keys(data).map((k) => {
    formdata.append(k, data[k]);
  });

  return http.upload(formdata, "/scan/", () => null);
}

export function update_scan(id, { picture, ...data }) {
  let formdata = new FormData();
  if (picture) {
    let parts = picture.split("/");
    let filename = parts[parts.length - 1];
    parts = filename.split(".");
    formdata.append("picture", {
      uri: picture,
      name: `${makeid(60)}.${parts[parts.length - 1]}`,
      type: "multipart/form-data",
    });
  }

  Object.keys(data).map((k) => {
    formdata.append(k, data[k]);
  });

  return http.upload(formdata, "/scan/" + id + "/", () => null, "put");
}
