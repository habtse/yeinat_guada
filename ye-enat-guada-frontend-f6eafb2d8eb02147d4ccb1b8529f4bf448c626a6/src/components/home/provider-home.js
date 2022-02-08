import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider, DJANGO_API_URL } from "../../api/AuthProvider.js";
import { Tab } from "@headlessui/react";
import * as OrdersProvider from "../../api/OrdersProvider.js";
import * as CustomersProvider from "../../api/CustomersProvider.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function DropDownMenu() {
    const navigate = useNavigate()
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="bg-transparent">
                    <img src={AuthProvider.getUser().avatarURL} className="aspect-square object-cover w-12 rounded-full" alt="profile" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <span className='text-gray-900 block px-4 py-2 text-sm'>
                                {`Signed in as\n ${AuthProvider.getUser().email}`}
                            </span>
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                    )}
                                    onClick={() => {
                                        AuthProvider.logout().then(() => {
                                            navigate("/login")
                                        })
                                    }}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const OrderDetails = ({ order, setOrders }) => {
    const getTotal = () => {
        return order.items.reduce(
            (acc, item) => acc + item.food.price * item.quantity,
            0
        );
    };
    const setOrderStatus = (status) => {
        if (status === "delivered") {
            OrdersProvider.markOrderAsDelivered(order.id).then(() => {
                setOrders((orders) =>
                    orders.map((o) =>
                        o.id === order.id ? { ...o, status: "delivered" } : o
                    )
                );
            });
        } else if (status === "ready") {
            OrdersProvider.markOrderAsReady(order.id).then(() => {
                setOrders((orders) =>
                    orders.map((o) => (o.id === order.id ? { ...o, status: "ready" } : o))
                );
            });
        }
    };
    return (
        <div className="flex flex-col gap-2 p-3">
            <h1 className="text-2xl">Order #{order.id}</h1>
            <hr />
            <h2 className="text-lg">Items</h2>
            <table className="border">
                <thead className="border">
                    <td>Food Name</td>
                    <td>Quantity</td>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.food.name}</td> <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div className="flex justify-between">
                Total : <span>${getTotal()}</span>
            </div>
            {order.status === "pending" && order.status !== "delivered" ? (
                <button
                    className="bg-green-500 text-white p-2 rounded"
                    type="button"
                    onClick={() => setOrderStatus("ready")}
                >
                    Mark as Ready
                </button>
            ) : (
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    type="button"
                    onClick={() => setOrderStatus("delivered")}
                >
                    Mark as Delivered
                </button>
            )}
        </div>
    );
};

const OrderCard = ({ order, isSelected, setSelectedOrder }) => {
    return (
        <div
            className={
                "flex items-center border rounded p-3 justify-between " +
                (isSelected ? " border-orange-300 border-2" : "")
            }
            onClick={() => setSelectedOrder(order)}
        >
            <span>Order #{order.id}</span>
            <span
                className={
                    "p-2 rounded " +
                    (order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "ready"
                            ? "bg-green-500"
                            : "bg-blue-500")
                }
            >
                {order.status}
            </span>
        </div>
    );
};

const Orders = ({ orders, setOrders, selectedOrder, setSelectedOrder }) => {
    return (
        <div className="grid grid-cols-4 grid-rows-1 p-3">
            <div className="col-span-3">
                <h1 className="text-4xl">Orders</h1>
                <div className="flex flex-col w-full p-2 gap-3">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard
                                order={order}
                                key={order.id}
                                isSelected={selectedOrder === order}
                                setSelectedOrder={setSelectedOrder}
                            />
                        ))
                    ) : (
                        <h1>No orders</h1>
                    )}
                </div>
            </div>
            <aside className="col-span-1 border rounded">
                {selectedOrder ? (
                    <OrderDetails order={selectedOrder} setOrders={setOrders} />
                ) : (
                    <h1 className="m-3">No order selected</h1>
                )}
            </aside>
        </div>
    );
};

const CustomerRow = ({ customer, setCustomers }) => {

    return (
        <div className="flex items-center border rounded p-3 justify-between">
            <div className="inline-flex gap-2 items-center">
                <img src={customer.avatarURL} className="aspect-square object-contain rounded-full w-10" />
                <span className="text-xl">{customer.firstName} {customer.lastName}</span>
                <span>{customer.email}</span>
            </div>
            <button className="opacity-50 hover:opacity-100 p-2 bg-red-500 text-white rounded">
                Remove
            </button>

        </div>
    );
};

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        CustomersProvider.getCustomersList().then((customers) =>
            setCustomers(customers)
        );
    }, []);

    return (
        <div className="flex flex-col p-3">
            <div className="col-span-3">
                <h1 className="text-4xl">Customers</h1>
                <div className="flex flex-col w-full p-2 gap-3">
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <CustomerRow
                                customer={customer}
                                key={customer.id}
                                setCustomers={setCustomers}
                            />
                        ))
                    ) : (
                        <h1>You have no customers</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    return (
        <div>
            <h1>Products</h1>
        </div>
    )
};

export const ProviderHome = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        OrdersProvider.getOrdersList().then((res) => {
            setOrders(res);
        });
    }, []);

    return (
        <div className="flex flex-col w-screen h-screen items-center">
            <nav className="p-2 w-full flex flex-row justify-between bg-orange-500 text-white items-center">
                <Link to="/">
                    {" "}
                    <h1 className="text-4xl">የእናት ጓዳ</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <DropDownMenu />
                </div>
            </nav>
            <div className="w-full m-3 flex-grow">
                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-orange-900/20 rounded-xl max-w-md">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-orange-700 rounded-lg",
                                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-orange-100 hover:bg-white/[0.12] hover:text-white"
                                )
                            }
                        >
                            Orders
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-orange-700 rounded-lg",
                                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-orange-100 hover:bg-white/[0.12] hover:text-white"
                                )
                            }
                        >
                            Customers
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-orange-700 rounded-lg",
                                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-orange-100 hover:bg-white/[0.12] hover:text-white"
                                )
                            }
                        >
                            Products
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2 h-full flex-grow">
                        <Tab.Panel className="h-full">
                            <Orders
                                orders={orders}
                                setOrders={setOrders}
                                selectedOrder={selectedOrder}
                                setSelectedOrder={setSelectedOrder}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Customers />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Products />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};
