import { Plus, Download } from "lucide-react";

export default function GroupManage({ groups, openCreateModal, exportToCSV }) {
  return (
    <div className="bg-white p-4 md:p-6 w-full md:w-96 rounded-lg shadow-md">
      <div>
        <h1 className="text-lg poppins-thin_600 mb-4">Quick Actions</h1>
      </div>

      <div className="space-y-3">
        <button
          onClick={openCreateModal}
          className="w-full py-2 bg-[#0B5D3A] text-sm px-4 text-white rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus size={16} />
          Add Group
        </button>

        <button
          onClick={exportToCSV}
          className="w-full py-2 bg-blue-600 text-sm px-4 text-white rounded-xl font-semibold flex items-center gap-2"
        >
          <Download size={16} />
          Export Data
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg poppins-thin_600 mb-4">Statistics</h2>
        <div className="space-y-4">
          <div className="bg-[#EDEDEDE0] p-3 rounded-md">
            <div className="text-2xl font-bold text-[#0B5D3A]">{groups.length}</div>
            <div className="text-sm text-gray-600">Total Groups</div>
          </div>
          <div className="bg-[#EDEDEDE0] p-3 rounded-md">
            <div className="text-2xl font-bold text-blue-600">
              {groups.filter((g) => g.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Groups</div>
          </div>
          <div className="bg-[#EDEDEDE0] p-3 rounded-md">
            <div className="text-2xl font-bold text-orange-600">
              {groups.reduce((sum, g) => sum + g.memberCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
