import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@service/api"
import _ from "lodash";
import { useErrorSnackbar, useSuccessSnackbar } from "../hooks/useSnackbar";

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

export function useGetQuery(key, url, map = _.identity) {
    return useGenericQuery(key, async () => map((await axiosInstance.get(url, { headers: DEFAULT_HEADERS, data: null })).data));
}

export function usePostMutation(key, url, invalidations = []) {
    return useGenericMutation(key, async body => (await axiosInstance.post(_.isFunction(url) ? url(body) : url, body ?? null)).data, invalidations);
}

export function usePutMutation(key, url, invalidations = []) {
    return useGenericMutation(key, async body => (await axiosInstance.put(_.isFunction(url) ? url(body) : url, body ?? null)).data, invalidations);
}

export function useDeleteMutation(key, url, invalidations = []) {
    return useGenericMutation(key, async body => (await axiosInstance.delete(_.isFunction(url) ? url(body) : url, { data: body ?? null })).data, invalidations);
}

function useGenericQuery(key, fn) {
    const { data } = useQuery({
        queryKey: key,
        queryFn: fn,
        keepPreviousData: true,
    });
    return data;
}

function useGenericMutation(key, fn, invalidations) {
    const qc = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: key,
        mutationFn: fn,
        onSuccess: () => {
            if (typeof invalidations === "function") {
                invalidations(qc);
            } else {
                invalidations.forEach(queryKey => qc.invalidateQueries([queryKey]));
            }
        }
    });
    return mutateAsync;
}


export const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    try {
      const res = await mutationFn(data);
      setSuccess(successMessage);
      return res;
    } catch (error) {
      setError(errorMessage);
    }
  };
