/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import ButtonSecondary from '@/components/button-secondary';
import {
  ChevronLeft,
  ChevronRight,
  FilterIcon,
  MoreVerticalIcon,
  SortAscIcon,
  SortDescIcon,
} from 'lucide-react';
import catPhoto from '../../assets/IMG_6554.jpg';
import { useFetchTicketAnother } from '@/hooks/use-ticket';
import { TicketType } from '@/types/ticket-type';
import { useEffect, useState } from 'react';
import useTable from '@/hooks/use-table';
import ButtonIcon from '@/components/button-icon';

const Ticket = () => {
  const { ticketList } = useFetchTicketAnother();
  const [sortConfig, setSortConfig] = useState('asc');
  const [page, setPage] = useState(1);
  const [thisLoading, setLoading] = useState(false);
  const { slice } = useTable(ticketList, page, 10);

  const convertDate = (date: string) => {
    const dateResult = new Date(date);
    return dateResult;
  };

  const reqSort = () => {
    let direction = 'asc';

    if (sortConfig === 'asc') {
      direction = 'desc';
    }
    setSortConfig(direction);
  };

  useEffect(() => {
    if (slice === undefined) {
      return setLoading(true);
    }

    if (thisLoading) {
      if (slice?.length < 1 && page !== 1) {
        setPage(page - 1);
      }
    }
  }, [slice, page, setPage, thisLoading]);

  useEffect(() => {
    if (sortConfig !== null) {
      slice?.sort((a: any, b: any): any => {
        if (a.ID < b.ID) {
          return sortConfig === 'asc' ? -1 : 1;
        }
        if (a.ID > b.ID) {
          return sortConfig === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }
  }, [ticketList, sortConfig]);

  return (
    <main className="px-10 py-6">
      <div className="container mx-auto py-10 bg-white border border-muted/50 dark:bg-black/20 rounded-md">
        <div className="flex flex-row justify-between items-center px-6">
          <h3 className="text-secondary dark:text-white font-semibold">
            All Ticket
          </h3>
          <div className="flex flex-row items-center space-x-5">
            <ButtonSecondary onClick={reqSort}>
              {sortConfig === 'asc' ? (
                <SortAscIcon className="h-4 w-4 text-muted" />
              ) : (
                <SortDescIcon className="h-4 w-4 text-muted" />
              )}
              <p className="text-secondary/70 dark:text-white/70 font-semibold text-sm">
                Sort
              </p>
            </ButtonSecondary>

            <ButtonSecondary>
              <FilterIcon className="h-4 w-4 text-muted" />
              <p className="text-secondary/70 dark:text-white/70 font-semibold text-sm">
                Filter
              </p>
            </ButtonSecondary>
          </div>
        </div>

        <table className="w-full divide-y-2 dark:divide-white/50">
          <thead className="text-muted">
            <th className="text-md px-6 py-3 text-left">Ticket details</th>
            <th className="text-md px-6 py-3 text-left">Customer name</th>
            <th className="text-md px-6 py-3 text-left">Date</th>
            <th className="text-md px-6 py-3 text-left">Priority</th>
            <th className="text-md px-6 py-3 text-left"></th>
          </thead>
          <tbody className="divide-y text-secondary dark:text-white/70 dark:divide-white/50">
            {slice?.map((item: TicketType) => (
              <tr
                key={item.ID}
                className="hover:bg-muted/30 hover:cursor-pointer transition-all"
              >
                <td className="text-md px-6 py-3 flex flex-row items-center">
                  <img src={catPhoto} className="w-10 rounded-full  mr-3" />
                  <div className="flex flex-col">
                    {item.Name}
                    <p className="text-muted/80 text-xs">Updated 1 day ago</p>
                  </div>
                </td>
                <td className="text-md px-6 py-3">{item.CreatedBy}</td>
                <td className="text-md px-6 py-3">
                  {convertDate(item.CreatedAt).toDateString()}
                </td>
                <td className="text-md px-6 py-3 ">
                  <div className="bg-red-500 text-center w-16 rounded-xl text-sm text-white">
                    High
                  </div>
                </td>
                <td>
                  <MoreVerticalIcon className="h-5 w-5" />
                </td>
              </tr>
            ))}

            {/* <tr className="hover:bg-muted/30 hover:cursor-pointer transition-all">
              <td className="text-md px-6 py-3 flex flex-row items-center">
                <img src={catPhoto} className="w-10 rounded-full  mr-3" />
                <div className="flex flex-col">
                  Adding images to Featured Posts
                  <p className="text-muted/80 text-xs">Updated 1 day ago</p>
                </div>
              </td>
              <td className="text-md px-6 py-3">Tom Cruise</td>
              <td className="text-md px-6 py-3">May 26, 2019</td>
              <td className="text-md px-6 py-3">
                <div className="bg-yellow-500 text-center w-16 rounded-xl text-sm text-white">
                  Low
                </div>
              </td>
              <td>
                <MoreVerticalIcon className="h-5 w-5" />
              </td>
            </tr> */}

            {/* <tr className="hover:bg-muted/30 hover:cursor-pointer transition-all">
              <td className="text-md px-6 py-3 flex flex-row items-center">
                <img src={catPhoto} className="w-10 rounded-full  mr-3" />
                <div className="flex flex-col">
                  Adding images to Featured Posts
                  <p className="text-muted/80 text-xs">Updated 1 day ago</p>
                </div>
              </td>
              <td className="text-md px-6 py-3">Tom Cruise</td>
              <td className="text-md px-6 py-3">May 26, 2019</td>
              <td className="text-md px-6 py-3">
                <div className="bg-green-500 text-center w-16 rounded-xl text-sm text-white">
                  Normal
                </div>
              </td>
              <td>
                <MoreVerticalIcon className="h-5 w-5" />
              </td>
            </tr> */}
          </tbody>
          <tfoot className="p-3">
            <ButtonIcon onClick={() => setPage(page - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </ButtonIcon>
            <ButtonIcon onClick={() => setPage(page + 1)}>
              <ChevronRight className="w-4 h-4" />
            </ButtonIcon>
          </tfoot>
        </table>
      </div>
    </main>
  );
};

export default Ticket;
