import React, { useState } from "react";
import { useProgram } from "@hooks/useProgram";
import SplitTile from "./SplitTile";
import ContentPaper from "../../../../components/papers/ContentPaper";
import { Box, Stack, useTheme } from "@mui/material";
import OptionsMenu from "../../../../components/OptionsMenu";
import ContentHeading from "../../../../components/headings/ContentHeading";
import Button from "../../../../components/buttons/Button";
import Icon from "../../../../components/Icon";
import FormModal from "../../../../components/FormModal";


const ProgramTile = ({ activeProgram, id, navigate }) => {
  const theme = useTheme()
  const { program, editProgram, deleteProgram, activateProgram, addSplit } = useProgram(id)

  const options = [
    { label: "Set Active", icon: "go", onClick: () => activateProgram() },
    { label: "Edit program naming", icon: "go", onClick: () => handleOpenEditProgram() },
    { label: "Delete program", icon: "go", onClick: () => deleteProgram() },
    { label: "Add split", icon: "go", onClick: () => handleOpenAddSplit() },
  ];

  const [openAddSplit, setOpenAddSplit] = useState(false);
  const handleOpenAddSplit = () => setOpenAddSplit(true);
  const handleCloseAddSplit = () => setOpenAddSplit(false);

  const [openEditProgram, setOpenEditProgram] = useState(false);
  const handleOpenEditProgram = () => setOpenEditProgram(true);
  const handleCloseEditProgram = () => setOpenEditProgram(false);


  const isActiveProgram = (id === activeProgram)

  return (
    <ContentPaper>
      <Box position={"absolute"} right={10} top={10}>
        <OptionsMenu options={options} />
      </Box>
      <ContentHeading title={program.name} subtitle={program.description}>

        <Icon name={isActiveProgram ? "starFilled" : "star"} />
      </ContentHeading>
      <Stack gap={4}>
        {program.splits.map((split) =>
          <SplitTile key={split.id} programId={id} id={split.id} name={split.name} description={split.description} exercises={split.exercises} navigate={navigate} />

        )}
        <Button outlined label={"Add Split"} color="primary" onClick={handleOpenAddSplit} />
      </Stack>
      <FormModal
        open={openAddSplit}
        handleClose={handleCloseAddSplit}
        title="Add split"
        action={addSplit}
        fields={[
          { name: "name", label: "Program name" },
          { name: "description", label: "Program description" },
        ]}
      />
      <FormModal
        open={openEditProgram}
        handleClose={handleCloseEditProgram}
        title="Edit split"
        action={editProgram}
        initialValues={{
          name: program?.name || "",
          description: program?.description || "",
        }}
        fields={[
          { name: "name", label: "Program name" },
          { name: "description", label: "Program description" },
        ]}
      />
    </ContentPaper>
  );
};

export default ProgramTile;
