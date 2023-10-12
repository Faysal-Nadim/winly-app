let winnerRawData = [
  {
    winner: {
      userName: "Muhammad Habib Chaudhry",
      ticketNumber: "WL-000001-Y",
      nationality: "Pakistan",
    },
    title: "USD 250",
  },
  {
    winner: {
      userName: "Adelina Paghubasan San Diego",
      ticketNumber: "WL-000002-Y",
      nationality: "Philippines",
    },
    title: "USD 250",
  },
  {
    winner: {
      userName: "Kumar Thapa",
      ticketNumber: "WL-000003-Y",
      nationality: "",
    },
    title: "USD 100",
  },
];

const Winner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCampaign());
  }, []);

  let campaign = useSelector((state) => state.campaign);
  // campaigns = campaigns?.campaign?.allCampaigns;
  // console.log(campaign?.campaigns?.allCampaigns);

  let winnersData = getNonNullWinnersData(
    campaign?.campaigns?.allCampaigns || []
  );
  // console.log(winnersData);

  return (
    <div className=" lg:px-8 md:px-6 sm:px-4  w-full  font-sora">
      <div className="flex flex-col gap-10">
        <p className="prim_text_2xl mb-0">Our Winners</p>

        <>
          {winnersData?.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="table table-xs text-xs w-full">
                <thead className="">
                  <tr>
                    <th></th>
                    <th>Prize</th>
                    <th>Winner Name</th>
                    <th>Ticket Number</th>
                    {/* <th>nationality</th> */}
                  </tr>
                </thead>
                <tbody>
                  {winnersData?.map((x, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{x?.title}</td>
                        <td>{x?.winner?.userName}</td>
                        <td>{x?.winner?.ticketNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="text-[14px] mt-2 text-center">
                No Winners Announced Yet
              </p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

function getNonNullWinnersData(dataArray) {
  console.log("data array", dataArray);
  const nonNullWinners = dataArray.filter(
    (item) =>
      item.winner.nationality !== null ||
      item.winner.ticketNumber !== null ||
      item.winner.userName !== null
  );

  const result = nonNullWinners.map((item) => {
    return {
      title: item.title,
      _id: item._id,
      winner: item.winner,
    };
  });

  return result;
}
