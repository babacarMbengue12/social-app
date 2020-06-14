import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";
import Layout from "../constants/Layout";
import http from "./http/http";
export default async function pickImage() {
  const status = await askAsync();
  let result;
  if (status) {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      return result;
    }
  }

  return {};
}

export async function crop({ uri, width, height }) {
  let y = height * 0.49;
  let x = width * 0.25;
  let cropWidth = width - x * 2;
  let cropHeight = height * 0.1;
  return await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        crop: {
          originX: x,
          originY: y,
          width: cropWidth,
          height: cropHeight,
        },
      },
    ],
    {
      format: ImageManipulator.SaveFormat.PNG,
    }
  );
}

export function base64toBlob(url) {
  return fetch(url).then((res) => res.blob());
}
export async function getCameraPermission() {
  const { status } = await Camera.requestPermissionsAsync();
  return status === "granted";
}

async function askAsync() {
  let status = (await ImagePicker.requestCameraPermissionsAsync()).status;
  if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return false;
  }
  return true;
}

export async function recognize({ uri, width, height }) {
  let formdata = new FormData();

  formdata.append("file", {
    uri,
    name: "image.png",
    type: "multipart/form-data",
  });
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return http.post("/recognize/", formdata, options);
}
