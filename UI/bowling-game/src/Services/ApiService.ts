import { json } from "stream/consumers";
import { IContestant, Roll } from "../Interfaces/Interfaces";

export class ApiService {
  hostURL: string = "https://localhost:5001/";

  headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  async Roll(roll: Roll): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/roll", {
      method: "POST",
      body: JSON.stringify(roll),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  // async AddContestants(roll: IContestant[]): Promise<any> {
  //   return await fetch(api.hostURL + "api/bowling/addcontestants", {
  //     method: "POST",
  //     body: roll,
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }

  AddContestants(
    Contestants: IContestant[],
    success: (success?: any) => void,
    error: (error?: any) => void
  ) {
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(Contestants),
    };
    const url = this.hostURL + "api/bowling/addcontestants";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        success(result);
      })
      .catch((err) => {
        console.log(err);
        error(err);
      });
  }

  async Leaderboard(): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/leaderboard", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  async Getcontestants(): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/getcontestants", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  async CheckExistingGame(): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/hasexisting", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  async CheckExistingGameIsComplete(): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/iscomplete", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  async ResetGame(): Promise<any> {
    return await fetch(api.hostURL + "api/bowling/reset", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
}

const apiinstance = new ApiService();

const globalAny: any = global;
globalAny.api = apiinstance;

export const api = apiinstance;
