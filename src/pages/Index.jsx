import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Plus } from 'lucide-react';

export default function DeploymentRosterTracker() {
  const [deployments, setDeployments] = useState([
    { id: 1, unit: "1st Infantry Division", location: "Afghanistan", startDate: "2023-06-01", endDate: "2023-12-01", personnel: 500, status: "Active" },
    { id: 2, unit: "3rd Armored Brigade", location: "South Korea", startDate: "2023-04-15", endDate: "2023-10-15", personnel: 750, status: "Active" },
    { id: 3, unit: "5th Special Forces Group", location: "Iraq", startDate: "2023-02-01", endDate: "2023-08-01", personnel: 200, status: "Completed" },
  ]);

  const [newDeployment, setNewDeployment] = useState({
    unit: "", location: "", startDate: "", endDate: "", personnel: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeployment(prev => ({ ...prev, [name]: value }));
  };

  const addDeployment = () => {
    if (newDeployment.unit && newDeployment.location && newDeployment.startDate && newDeployment.endDate && newDeployment.personnel) {
      setDeployments(prev => [...prev, { ...newDeployment, id: prev.length + 1, status: "Active" }]);
      setNewDeployment({ unit: "", location: "", startDate: "", endDate: "", personnel: "" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Military Deployment Roster Tracker</h1>
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Deployment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="unit" value={newDeployment.unit} onChange={handleInputChange} placeholder="Unit" />
          <Input name="location" value={newDeployment.location} onChange={handleInputChange} placeholder="Location" />
          <Input name="startDate" value={newDeployment.startDate} onChange={handleInputChange} type="date" placeholder="Start Date" />
          <Input name="endDate" value={newDeployment.endDate} onChange={handleInputChange} type="date" placeholder="End Date" />
          <Input name="personnel" value={newDeployment.personnel} onChange={handleInputChange} type="number" placeholder="Personnel Count" />
          <Button onClick={addDeployment} className="flex items-center justify-center">
            <Plus className="mr-2" size={16} /> Add Deployment
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Personnel</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableCell>{deployment.unit}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {deployment.location}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {deployment.startDate}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {deployment.endDate}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  {deployment.personnel}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={deployment.status === "Active" ? "default" : "secondary"}>
                  {deployment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}