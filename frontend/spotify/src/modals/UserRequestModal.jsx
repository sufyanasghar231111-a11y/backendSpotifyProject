import React, { useContext } from "react";
import { requestContext } from "../contextapi/UserRequest";

const UserRequestModal = () => {
  const {
    requestpopup,
    setRequestpopup,
    description,
    setDescription,
    requestArtist,
    setPopup,
    popup,
  } = useContext(requestContext);

  return (
    <>
      {requestpopup && (
        <>
          {/* Overlay */}
          <div
            onClick={() => {
              setRequestpopup(false);
              setPopup(false);
              setDescription("");
            }}
            className="fixed inset-0 z-[199] bg-black/40"
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 z-[205] w-[86%] max-w-[360px] sm:w-[92%] sm:max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#282828] p-4 sm:p-6 max-h-[78vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Already Submitted Popup */}
            {popup && (
              <div className="absolute inset-0 z-[206] flex items-center justify-center rounded-xl bg-black/40">
                <div className="w-[88%] max-w-[290px] rounded-xl border border-red-500 bg-[#2a1a1a] p-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-lg text-red-400">⚠️</span>

                    <div className="flex-1">
                      <h2 className="text-sm font-semibold text-white sm:text-base">
                        Request Already Submitted
                      </h2>

                      <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:text-sm">
                        You have already submitted an artist role request.
                      </p>

                      <button
                        onClick={() => setPopup(false)}
                        className="mt-4 rounded-full bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
                      >
                        Got it
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <h2 className="text-lg font-semibold text-white sm:text-2xl">
              Request Artist Role
            </h2>

            <p className="mt-1 text-[11px] text-gray-400 sm:text-sm">
              Tell us why you'd like to become an artist.
            </p>

            {/* Description */}
            <div className="mt-5 sm:mt-6">
              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your music experience and why you're requesting the Artist role."
                rows={4}
                className="h-24 sm:h-32 w-full resize-none rounded-lg border border-[#404040] bg-[#1f1f1f] p-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-green-500"
              />
            </div>

            {/* Role */}
            <div className="mt-4 sm:mt-5">
              <label className="mb-2 block text-sm text-gray-300">
                Role
              </label>

              <select className="w-full rounded-lg border border-[#404040] bg-[#1f1f1f] p-3 text-sm text-white outline-none transition focus:border-green-500">
                <option value="artist">Artist</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:mt-7 sm:flex-row sm:justify-end sm:gap-3">
              <button
                onClick={() => {
                  setRequestpopup(false);
                  setDescription("");
                }}
                className="w-full rounded-full bg-[#3b3b3b] px-5 py-2 text-sm text-white transition hover:bg-[#4a4a4a] sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={requestArtist}
                disabled={description.trim() === ""}
                className={`w-full rounded-full px-5 py-2 text-sm font-semibold text-black transition sm:w-auto ${
                  description.trim() === ""
                    ? "cursor-not-allowed bg-[#1DB954] opacity-40"
                    : "cursor-pointer bg-[#1DB954] hover:bg-[#1ed760]"
                }`}
              >
                Submit Request
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserRequestModal;