import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { type AppDispatch, type RootState } from "../../../api/store";
import { createManualRide } from "../../../api/slices/manualRideSlice";
import AdminLayout from "../layout/AdminLayout";

const CreateManualRide = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.manualRide || {});

  const [formData, setFormData] = useState({
    deliveryDropoff: [
      {
        deliveryLatitude: 4.8937002,
        deliveryLongitude: 6.9063487,
        deliveryAddress: "",
        receiverName: "",
        receiverPhoneNumber: "",
        items: [{ itemName: "" }],
        price: 0,
      },
    ],
    totalPrice: 0,
    pickup: {
      pickupLatitude: 4.8937002,
      pickupLongitude: 6.9063487,
      pickupAddress: "",
    },
    typeOfVehicle: { name: "Bike", bikePrice: 0 },
    customerData: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      countryCode: "+234",
    },
  });

  // Auto calculate total price
  useEffect(() => {
    const total = formData.deliveryDropoff.reduce((sum, drop) => {
      return sum + (Number(drop.price) || 0);
    }, 0);
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.deliveryDropoff]);

  // Capitalize first letter of each word
  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const addDropoff = () => {
    setFormData((prev) => ({
      ...prev,
      deliveryDropoff: [
        ...prev.deliveryDropoff,
        {
          deliveryLatitude: 4.8937002,
          deliveryLongitude: 6.9063487,
          deliveryAddress: "",
          receiverName: "",
          receiverPhoneNumber: "",
          items: [{ itemName: "" }],
          price: 0,
        },
      ],
    }));
  };

  const removeDropoff = (index: number) => {
    if (formData.deliveryDropoff.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      deliveryDropoff: prev.deliveryDropoff.filter((_, i) => i !== index),
    }));
  };

  const updateDropoff = (index: number, field: string, value: any) => {
    const updated = [...formData.deliveryDropoff];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, deliveryDropoff: updated }));
  };

  const updateItem = (dropIndex: number, itemIndex: number, value: string) => {
    const updated = [...formData.deliveryDropoff];
    updated[dropIndex].items[itemIndex].itemName = value;
    setFormData((prev) => ({ ...prev, deliveryDropoff: updated }));
  };

  const addItem = (dropIndex: number) => {
    const updated = [...formData.deliveryDropoff];
    updated[dropIndex].items.push({ itemName: "" });
    setFormData((prev) => ({ ...prev, deliveryDropoff: updated }));
  };

  const removeItem = (dropIndex: number, itemIndex: number) => {
    const updated = [...formData.deliveryDropoff];
    if (updated[dropIndex].items.length > 1) {
      updated[dropIndex].items.splice(itemIndex, 1);
      setFormData((prev) => ({ ...prev, deliveryDropoff: updated }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Capitalize names before sending
    const processedData = {
      ...formData,
      customerData: {
        ...formData.customerData,
        firstName: toTitleCase(formData.customerData.firstName),
        lastName: toTitleCase(formData.customerData.lastName),
      },
      deliveryDropoff: formData.deliveryDropoff.map((drop) => ({
        ...drop,
        receiverName: toTitleCase(drop.receiverName),
      })),
    };

    try {
      await dispatch(createManualRide(processedData)).unwrap();

      const firstName = toTitleCase(formData.customerData.firstName);
      alert(`✅ Manual ride for ${firstName} created successfully!`);

      navigate("/app/admin/manual-booking");
    } catch (err: any) {
      alert(err?.message || "Failed to create ride");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 font-medium"
        >
          <FiArrowLeft /> Back to Manual Rides
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10"
        >
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            Create New Manual Ride
          </h1>
          <p className="text-gray-500 mb-8">
            Price is per dropoff • Total is cumulative
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b pb-3">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <input
                  placeholder="First Name"
                  required
                  value={formData.customerData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerData: {
                        ...prev.customerData,
                        firstName: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                />
                <input
                  placeholder="Last Name"
                  required
                  value={formData.customerData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerData: {
                        ...prev.customerData,
                        lastName: e.target.value,
                      },
                    }))
                  }
                  className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                />
              </div>
              <input
                placeholder="Phone Number"
                required
                value={formData.customerData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerData: {
                      ...prev.customerData,
                      phoneNumber: e.target.value,
                    },
                  }))
                }
                className="w-full border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
              />
            </div>

            {/* Pickup */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b pb-3">
                Pickup Location
              </h3>
              <input
                placeholder="Pickup Address"
                required
                value={formData.pickup.pickupAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pickup: { ...prev.pickup, pickupAddress: e.target.value },
                  }))
                }
                className="w-full border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
              />
            </div>

            {/* Delivery Dropoffs */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Delivery Dropoffs</h3>
                <button
                  type="button"
                  onClick={addDropoff}
                  className="flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600"
                >
                  <FiPlus /> Add Dropoff
                </button>
              </div>

              {formData.deliveryDropoff.map((drop, dropIndex) => (
                <div
                  key={dropIndex}
                  className="border-2 border-gray-100 rounded-3xl p-8 relative"
                >
                  {formData.deliveryDropoff.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDropoff(dropIndex)}
                      className="absolute top-6 right-6 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={22} />
                    </button>
                  )}

                  <h4 className="font-bold text-lg mb-6">
                    Dropoff {dropIndex + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      placeholder="Delivery Address"
                      required
                      value={drop.deliveryAddress}
                      onChange={(e) =>
                        updateDropoff(
                          dropIndex,
                          "deliveryAddress",
                          e.target.value
                        )
                      }
                      className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                    />
                    <input
                      placeholder="Receiver Name"
                      required
                      value={drop.receiverName}
                      onChange={(e) =>
                        updateDropoff(dropIndex, "receiverName", e.target.value)
                      }
                      className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                    />
                    <input
                      placeholder="Receiver Phone"
                      required
                      value={drop.receiverPhoneNumber}
                      onChange={(e) =>
                        updateDropoff(
                          dropIndex,
                          "receiverPhoneNumber",
                          e.target.value
                        )
                      }
                      className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Price for this Dropoff (₦)"
                      required
                      value={drop.price}
                      onChange={(e) =>
                        updateDropoff(
                          dropIndex,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      className="border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none font-semibold"
                    />
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between mb-4">
                      <p className="font-bold">Items</p>
                      <button
                        type="button"
                        onClick={() => addItem(dropIndex)}
                        className="text-[#FF0000] text-sm font-bold"
                      >
                        + Add Item
                      </button>
                    </div>
                    {drop.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-3 mb-3">
                        <input
                          placeholder="Item name"
                          value={item.itemName}
                          onChange={(e) =>
                            updateItem(dropIndex, itemIndex, e.target.value)
                          }
                          className="flex-1 border border-gray-200 rounded-2xl px-6 py-4 focus:border-[#FF0000] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(dropIndex, itemIndex)}
                          className="text-red-500"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-3">
                Total Price (Cumulative)
              </h3>
              <p className="text-5xl font-black text-[#FF0000]">
                ₦{formData.totalPrice.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Sum of all dropoff prices
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF0000] hover:bg-red-600 text-white py-6 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              <FiSave size={22} />
              {loading ? "Creating Ride..." : "Create & Dispatch Manual Ride"}
            </button>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default CreateManualRide;
