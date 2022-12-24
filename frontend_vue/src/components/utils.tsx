import { defineStore } from "pinia";
import axios from "axios";
// import { randomInt } from "crypto";

export class HttpMethods {
  static Get(): string {
    return "GET";
  }
  static Post(): string {
    return "POST";
  }
  static Put(): string {
    return "PUT";
  }
  static Patch(): string {
    return "PATCH";
  }
  static Delete(): string {
    return "DELETE";
  }
}

// + `${randomInt(1, 99999)}`
export function ConstructorStore(name: string) {
  return defineStore(`${name}_Store`, {
    state: () => {
      return {
        load: false,
        data: undefined,
        back_error: undefined,
        front_error: undefined,
      };
    },
    getters: {
      g_get(): any {
        return this.load, this.data, this.back_error, this.front_error;
      },
    },
    actions: {
      a_get(): any {
        return this.load, this.data, this.back_error, this.front_error;
      },
      a_load(): void {
        this.load = true;
        this.data = undefined;
        this.back_error = undefined;
        this.front_error = undefined;
      },
      a_set(data: any) {
        this.load = false;
        this.data = data;
        this.back_error = undefined;
        this.front_error = undefined;
      },
      a_back_error(back_error: string) {
        this.load = false;
        this.data = undefined;
        // @ts-ignore
        this.back_error = back_error;
        this.front_error = undefined;
      },
      a_front_error(front_error: string) {
        this.load = false;
        this.data = undefined;
        this.back_error = undefined;
        // @ts-ignore
        this.front_error = front_error;
      },
    },
  })();
}

export function ConstructorAction(
  form: object,
  url: string,
  method: string,
  timeout: number,
  auth: boolean
): Function {
  return async function (): Promise<any> {
    try {
      console.log("LOAD");

      form = {
        ...form,
        "Action-Type": `url: ${url} | method: ${method} | auth: ${auth}`,
      };

      if (method === "GET" || method === "DELETE") {
        url = url + `?`;
        Object.entries(form).map(([key, value]) => {
          url = url + `${key}=${value}&`;
        });
        url = url.slice(0, -1);
      }

      const formData = new FormData();
      if (method === "POST" || method === "PUT") {
        Object.entries(form).map(([key, value]) => {
          formData.append(key, value);
        });
      }

      const token = "";

      const config = {
        url: url,
        method: method,
        timeout: timeout,
        timeoutErrorMessage: "timeout error",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios(config);
      if (response.data && response.data.response) {
        console.log("SUCCESS", response.data.response);

        return response.data.response;
      } else {
        console.log("ERROR", response);
      }
    } catch (error) {
      console.log("FAIL", error);
    }
  };
}

export function ConstructorAction1(
  form: object,
  url: string,
  method: string,
  timeout: number,
  auth: boolean,
  constantStore: any
): Function {
  return async function (): Promise<void> {
    try {
      constantStore.a_load();

      form = {
        ...form,
        "Action-Type": `url: ${url} | method: ${method} | auth: ${auth}`,
      };

      if (method === "GET" || method === "DELETE") {
        url = url + `?`;
        Object.entries(form).map(([key, value]) => {
          url = url + `${key}=${value}&`;
        });
        url = url.slice(0, -1);
      }

      const formData = new FormData();
      if (method === "POST" || method === "PUT") {
        Object.entries(form).map(([key, value]) => {
          formData.append(key, value);
        });
      }

      const token = "";

      const config = {
        url: url,
        method: method,
        timeout: timeout,
        timeoutErrorMessage: "timeout error",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios(config);

      if (response && response.data && response.data.response) {
        constantStore.a_set(response.data.response);
      } else {
        constantStore.a_back_error(
          // @ts-ignore
          response.Error ? response.Error : "backend error"
        );
      }
    } catch (error) {
      constantStore.a_front_error(error ? error : "frontend error");
    }
  };
}
