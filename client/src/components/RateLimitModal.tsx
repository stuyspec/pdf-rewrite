export default function RateLimitModal() {
  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Slow Down!</h3>
        <p className="py-4">
          Your request has been rate limited. Wait one minute before making
          another request.
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
