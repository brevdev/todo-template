import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

// TODO: rather than pass your backend api url around,
//       just place it here.

// const BREV_URL = "YOUR_BREV_URL"

const responseBody = (res: AxiosResponse) => res.data;

const openRequests = {
  del: (url: string) => axios.delete(url).then(responseBody),
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, data?: any) => axios.post(url, data).then(responseBody),
  put: (url: string, data?: any) => axios.put(url, data).then(responseBody),
};

interface IToDo {
  id: string;
  title: string;
  isComplete: boolean;
}

interface MultipleToDos {
  todos: IToDo[];
}

// TODO: now that you have your URL passed in above,
//       change the url below to use it.
// For example:
//  getAll: () => openRequests.get(BREV_URL + "/api/Todos") as Promise<MultipleToDos>,
// Note: the component doesn't have to pass in anything!

export const ToDos = {
  getAll: (url: string) => openRequests.get(url) as Promise<MultipleToDos>,
  add: (url: string, todo: Partial<IToDo>) =>
    openRequests.post(url, todo) as Promise<any>,
  changeStatus: (url: string, id: string, isChecked: boolean) =>
    openRequests.put(url + `?id=${id}&isChecked=${isChecked}`) as Promise<any>,
};

export function useToDos(url: string) {
  const { data, error, mutate } = useSWR<MultipleToDos>(
    [url],
    async (url) => await ToDos.getAll(url),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );
  return {
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}
