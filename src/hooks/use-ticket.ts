import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useFetchTicketAnother = () => {
  const [ticketList, setTicket] = useState([]);
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(baseURL + 'member', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result: BaseType = await response.json();
      setTicket(result.data);
    } catch (err) {
      console.log(err);
    }

    // const response = await axios.get(baseURL + 'member', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });

    // const result: BaseType = await response.data;
    // return result;
  }, [baseURL, user.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ticketList };
};

const fetchTicket = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'member', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useTicketQuery = () =>
  useQuery({
    queryKey: ['ticket'],
    queryFn: fetchTicket,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const useTicketMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { name: string; phone: string }) => {
      await axios.post(baseURL + 'member', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
    onSuccess: async (addTicket) => {
      await queryClient.invalidateQueries({ queryKey: ['ticket'] });

      queryClient.setQueryData(['ticket'], addTicket);
    },
  });
};
