import ButtonIcon from '@/components/button-icon';
import Input from '@/components/input';
import OverviewStat from '@/components/overview-stat';
import { useTicketMutation, useTicketQuery } from '@/hooks/use-ticket';
import { TicketType } from '@/types/ticket-type';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from 'lucide-react';
import { ChangeEvent, Fragment, useEffect, useReducer, useState } from 'react';

type TicketInputType = {
  name: string;
  phone: string;
};

const Overview = () => {
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading } = useTicketQuery();

  const [inputTicket, setInputTicket] = useReducer(
    (current: TicketInputType, update: Partial<TicketInputType>) => ({
      ...current,
      ...update,
    }),
    {
      name: '',
      phone: '',
    }
  );
  const ticketMutation = useTicketMutation();

  const overviewStatData = [
    {
      title: 'Unresolved',
      value: data?.data.length,
    },
    {
      title: 'Overdue',
      value: '20',
    },
    {
      title: 'Open',
      value: '10',
    },
    {
      title: 'On Hold',
      value: data?.data.length,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      return setInputTicket({
        phone: `8538672123${Math.floor(Math.random() * (20 + 1) + 1)}`,
      });
    }
    return;
  }, [isOpen]);

  return (
    <>
      <main className="px-10">
        <div className="container mx-auto py-6 space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {overviewStatData.map((item) => (
              <OverviewStat
                key={item.title}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
          <div className="bg-white border border-muted/50 w-full rounded-md dark:bg-black/20 ">
            <div className="flex flex-row">
              <div className="flex text-black w-3/5 lg:w-[60%] border-r border-gray-500/20 dark:text-white p-5 items-center justify-center">
                Graph
              </div>
              <div className="flex flex-col divide-y w-2/5 lg:w-[40%] dark:divide-gray-500/20">
                {overviewStatData.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-center items-center py-5"
                  >
                    <p className="font-semibold text-muted">{item.title}</p>
                    <h2 className="font-bold text-lg text-secondary dark:text-white">
                      {item.value}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full space-x-10">
            <div className="flex flex-col bg-white border border-muted/50 w-1/2 rounded-md dark:bg-black/20">
              <div className="flex flex-row justify-between w-full text-muted font-semibold p-5">
                <h3>Unresolved Tickets</h3>
                <a className="text-sm">View details</a>
              </div>
              <div className="divide-y dark:divide-gray-500/40">
                <div className="flex flex-row w-full justify-between p-5 ">
                  <p className="text-sm font-semibold text-muted dark:text-white/70">
                    Create new ticket
                  </p>
                  <ButtonIcon onClick={() => setOpen(true)}>
                    <PlusIcon className="h-4 w-4" />
                  </ButtonIcon>
                </div>
                {data?.data
                  .slice(12, 20)
                  .reverse()
                  .map((item: TicketType) => {
                    return (
                      <div
                        key={item.ID}
                        className="flex flex-row w-full justify-between p-5 "
                      >
                        <p className="text-sm font-semibold text-foreground dark:text-white/70">
                          {item.Name}
                        </p>
                        <p className="text-sm font-semibold text-muted">
                          {item.IsActive}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex flex-col bg-white border border-muted/50 w-1/2 rounded-md dark:bg-black/20">
              <div className="flex flex-row justify-between w-full text-muted font-semibold p-5">
                <h3>Task</h3>
                <a className="text-sm">View details</a>
              </div>
              <div className="divide-y dark:divide-gray-500/40">
                {isLoading === true ? (
                  <div>Loading</div>
                ) : (
                  overviewStatData.map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-row w-full justify-between p-5 "
                    >
                      <p className="text-sm font-semibold text-foreground dark:text-white/70">
                        {item.title}
                      </p>
                      <p className="text-sm font-semibold text-muted">
                        {item.value}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Ticket
                  </Dialog.Title>

                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Ticket name"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInputTicket({
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        ticketMutation.mutate(inputTicket);
                        setOpen(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Overview;
