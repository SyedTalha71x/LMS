const CertificateProgress = () => {
  const certificates = [
    {
      id: 1,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3, 
    },
    {
      id: 2,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
    },
    {
      id: 3,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
    },
    {
      id: 4,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
    },
    {
      id: 5,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
    },
    {
      id: 6,
      title: "Basic of Pharma",
      percentage: 87,
      stage: "Stage 1-5",
      completedStages: 3,
    },
  ];

  return (
    <div className=" p-4 md:p-6">
      <h1 className="text-2xl  mb-6 poppins-thin_600">Certificate progress</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-[#F2F2F2] p-5 rounded-xl">
            <h3 className="text-sm poppins-thin_600 mb-1">{certificate.title}</h3>
            <div className="text-4xl font-bold mb-1">
              {certificate.percentage}%
            </div>
            <p className="text-sm text-gray-600 mb-4">
              of customers recommend this product
            </p>

            <div className="space-y-2">
              <div className="text-sm font-medium">Progress</div>

              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((stage) => (
                  <div
                    key={stage}
                    className={`h-2 flex-1 ${
                      stage <= certificate.completedStages
                        ? "bg-[#0B5D3A]"
                        : "bg-gray-200"
                    } ${stage === 1 ? "rounded-l-full" : ""} ${
                      stage === 5 ? "rounded-r-full" : ""
                    }`}
                  ></div>
                ))}
              </div>

              <div className="text-xs text-gray-700">{certificate.stage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateProgress;
